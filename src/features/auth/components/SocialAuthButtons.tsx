import { AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
    getSocialAuthErrorMessage,
    startSocialAuth,
} from '../api/socialAuth'
import type { SocialAuthProvider } from '../types/auth.types'
import styles from './SocialAuthButtons.module.scss'

interface SocialAuthButtonsProps {
    redirectPath?: string
}

const providers: { id: SocialAuthProvider; label: string }[] = [
    { id: 'google', label: 'Google' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'discord', label: 'Discord' },
]

const ProviderIcon = ({ provider }: { provider: SocialAuthProvider }) => {
    if (provider === 'google') {
        return (
            <svg className={styles.providerIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.38 3.6v3h3.85c2.25-2.07 3.58-5.12 3.58-8.84z"
                />
                <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.85-3c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.29a12 12 0 0 0 0 10.74l3.98-3.09z"
                />
                <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.63l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
                />
            </svg>
        )
    }

    if (provider === 'facebook') {
        return (
            <svg className={styles.providerIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="#1877F2"
                    d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z"
                />
            </svg>
        )
    }

    return (
        <svg className={styles.providerIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#5865F2"
                d="M20.32 4.37a19.8 19.8 0 0 0-4.9-1.52.07.07 0 0 0-.08.04c-.21.38-.45.88-.61 1.27a18.3 18.3 0 0 0-5.46 0 12.6 12.6 0 0 0-.63-1.27.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.9 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.13c.13-.1.25-.19.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.3a.08.08 0 0 1-.01.13c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.11c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .09.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z"
            />
        </svg>
    )
}

const SocialAuthButtons = ({ redirectPath = '/' }: SocialAuthButtonsProps) => {
    const [pendingProvider, setPendingProvider] = useState<SocialAuthProvider | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleProviderClick = async (provider: SocialAuthProvider) => {
        if (pendingProvider) {
            return
        }

        setPendingProvider(provider)
        setError(null)

        try {
            await startSocialAuth(provider, redirectPath)
        } catch (authError) {
            setError(getSocialAuthErrorMessage(authError))
            setPendingProvider(null)
        }
    }

    return (
        <div className={styles.wrapper}>
            {error && (
                <div className={styles.alert} role="alert">
                    <AlertCircle className={styles.alertIcon} size={18} aria-hidden="true"/>
                    <span>{error}</span>
                </div>
            )}

            <div className={styles.providers}>
                {providers.map((provider) => {
                    const isPending = pendingProvider === provider.id

                    return (
                        <button
                            key={provider.id}
                            className={styles.providerButton}
                            type="button"
                            onClick={() => void handleProviderClick(provider.id)}
                            disabled={pendingProvider !== null}
                            aria-label={`Tiếp tục với ${provider.label}`}
                            aria-busy={isPending}
                        >
                            {isPending ? (
                                <Loader2
                                    className={styles.spinner}
                                    size={20}
                                    aria-hidden="true"
                                />
                            ) : (
                                <ProviderIcon provider={provider.id}/>
                            )}
                            <span>{provider.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SocialAuthButtons
