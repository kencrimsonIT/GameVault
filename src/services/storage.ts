export function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
import type { AuthSession } from '../features/auth/types/auth.types'

const AUTH_STORAGE_KEY = 'gamevault.auth.session'

const isSession = (value: unknown): value is AuthSession => {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    const session = value as Partial<AuthSession>

    return typeof session.token === 'string' && typeof session.user?.id === 'number'
}

export const authStorage = {
    save(session: AuthSession, rememberMe: boolean) {
        authStorage.clear()

        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    },

    read(): AuthSession | null {
        for (const storage of [localStorage, sessionStorage]) {
            const raw = storage.getItem(AUTH_STORAGE_KEY)

            if (!raw) {
                continue
            }

            try {
                const parsed: unknown = JSON.parse(raw)

                if (isSession(parsed)) {
                    return parsed
                }
            } catch {
                // Ignore corrupted values.
            }
        }

        return null
    },

    clear() {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        sessionStorage.removeItem(AUTH_STORAGE_KEY)
    },
}
