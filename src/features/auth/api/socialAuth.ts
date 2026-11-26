import { createClient } from '@supabase/supabase-js'
import type { Session } from '@supabase/supabase-js'
import { env } from '../../../config/env'
import { authApi, AuthApiError, getAuthErrorMessage } from './authApi'
import type {
    AuthSession,
    SocialAuthProfile,
    SocialAuthProvider,
} from '../types/auth.types'

const CALLBACK_PATH = '/auth/callback'
const REDIRECT_STORAGE_KEY = 'gamevault.auth.social-redirect'
const SESSION_POLL_ATTEMPTS = 12
const SESSION_POLL_INTERVAL_MS = 250

export class SocialAuthError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'SocialAuthError'
    }
}

const isConfigured = () => {
    if (!env.supabaseUrl || !env.supabaseAnonKey) {
        return false
    }

    try {
        new URL(env.supabaseUrl)
        return true
    } catch {
        return false
    }
}

const socialAuthClient = (() => {
    if (!isConfigured()) {
        return null
    }

    try {
        return createClient(env.supabaseUrl, env.supabaseAnonKey, {
            auth: {
                flowType: 'pkce',
                detectSessionInUrl: true,
                persistSession: true,
                autoRefreshToken: true,
            },
        })
    } catch {
        return null
    }
})()

export const isSocialAuthConfigured = Boolean(socialAuthClient)

const toSafeRedirectPath = (value: string | null | undefined) => {
    if (!value || !value.startsWith('/') || value.startsWith('//')) {
        return '/'
    }

    return value
}

const readString = (value: unknown) => {
    if (typeof value !== 'string' || !value.trim()) {
        return ''
    }

    return value.trim()
}

const isSocialProvider = (value: unknown): value is SocialAuthProvider =>
    value === 'google' || value === 'facebook' || value === 'discord'

const getProvider = (session: Session): SocialAuthProvider => {
    const provider = [
        session.user.app_metadata.provider,
        ...(session.user.identities ?? []).map((identity) => identity.provider),
    ].find(isSocialProvider)

    if (!provider) {
        throw new SocialAuthError('Nhà cung cấp đăng nhập này chưa được hỗ trợ.')
    }

    return provider
}

const readOAuthUrlError = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))

    return (
        searchParams.get('error_description') ??
        hashParams.get('error_description') ??
        searchParams.get('error') ??
        hashParams.get('error')
    )
}

const waitForSession = async () => {
    if (!socialAuthClient) {
        throw new SocialAuthError(
            'Đăng nhập mạng xã hội chưa được cấu hình. Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env.',
        )
    }

    const oauthError = readOAuthUrlError()

    if (oauthError) {
        throw new SocialAuthError(
            'Nhà cung cấp đã từ chối yêu cầu đăng nhập. Vui lòng thử lại.',
        )
    }

    for (let attempt = 0; attempt < SESSION_POLL_ATTEMPTS; attempt += 1) {
        const { data, error } = await socialAuthClient.auth.getSession()

        if (error) {
            throw new SocialAuthError(
                'Không thể xác thực phiên đăng nhập mạng xã hội. Vui lòng thử lại.',
            )
        }

        if (data.session) {
            return data.session
        }

        await new Promise((resolve) => {
            window.setTimeout(resolve, SESSION_POLL_INTERVAL_MS)
        })
    }

    throw new SocialAuthError(
        'Phiên đăng nhập mạng xã hội không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.',
    )
}

const readProfile = async (): Promise<SocialAuthProfile> => {
    const session = await waitForSession()
    const { user } = session
    const metadata = user.user_metadata ?? {}
    const identityData = user.identities?.[0]?.identity_data ?? {}
    const provider = getProvider(session)

    const email =
        readString(user.email) ||
        readString(metadata.email) ||
        readString(identityData.email)

    if (!email) {
        throw new SocialAuthError(
            'Tài khoản mạng xã hội không chia sẻ địa chỉ email. Vui lòng cấp quyền email và thử lại.',
        )
    }

    const fullName =
        readString(metadata.full_name) ||
        readString(metadata.name) ||
        readString(identityData.full_name) ||
        readString(identityData.name) ||
        email.split('@')[0]

    const avatar =
        readString(metadata.avatar_url) ||
        readString(metadata.picture) ||
        readString(identityData.avatar_url) ||
        readString(identityData.picture)

    return {
        provider,
        fullName,
        email,
        avatar,
        emailVerified: Boolean(user.email_confirmed_at),
        accessToken: session.access_token,
    }
}

let completionPromise: Promise<AuthSession> | null = null

/**
 * Completes a pending OAuth callback. The module-level promise deduplicates the
 * exchange when React StrictMode mounts the callback page twice in development.
 */
export const completeSocialAuth = () => {
    if (!completionPromise) {
        completionPromise = readProfile()
            .then((profile) => authApi.loginWithSocial(profile))
            .catch((error: unknown) => {
                completionPromise = null
                throw error
            })
    }

    return completionPromise
}

export const startSocialAuth = async (
    provider: SocialAuthProvider,
    redirectPath = '/',
) => {
    if (!socialAuthClient) {
        throw new SocialAuthError(
            'Đăng nhập mạng xã hội chưa được cấu hình. Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env.',
        )
    }

    sessionStorage.setItem(REDIRECT_STORAGE_KEY, toSafeRedirectPath(redirectPath))

    const { error } = await socialAuthClient.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${window.location.origin}${CALLBACK_PATH}`,
            ...(provider === 'google'
                ? { queryParams: { prompt: 'select_account' } }
                : {}),
        },
    })

    if (error) {
        sessionStorage.removeItem(REDIRECT_STORAGE_KEY)
        throw new SocialAuthError(
            'Không thể bắt đầu đăng nhập mạng xã hội. Vui lòng thử lại.',
        )
    }
}

export const consumeSocialRedirectPath = () => {
    const path = sessionStorage.getItem(REDIRECT_STORAGE_KEY)

    sessionStorage.removeItem(REDIRECT_STORAGE_KEY)

    return toSafeRedirectPath(path)
}

export const signOutOfSocialAuth = async () => {
    if (!socialAuthClient) {
        return
    }

    try {
        await socialAuthClient.auth.signOut({ scope: 'local' })
    } catch {
        // The local app session is cleared regardless of the remote sign-out result.
    }
}

export const getSocialAuthErrorMessage = (error: unknown) => {
    if (error instanceof SocialAuthError || error instanceof AuthApiError) {
        return error.message
    }

    return getAuthErrorMessage(error)
}
