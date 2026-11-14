export type UserRole = 'user' | 'admin'

export type UserStatus = 'active' | 'suspended'

export type AuthProvider = 'email' | 'google' | 'steam' | 'discord'

export interface User {
    id: number
    userCode: string
    fullName: string
    displayName: string
    gamertag: string
    gamertagVerified: boolean
    email: string
    phone: string
    avatar: string
    country: string
    currency: string
    role: UserRole
    rank: string
    isVerified: boolean
    walletBalance: number
    rewardPoints: number
    ownedKeysCount: number
    wishlist: string[]
    authProviders: AuthProvider[]
    lastLoginIp: string
    status: UserStatus
    createdAt: string
    updatedAt: string
}

/** Shape stored by json-server: the public user plus the mock password. */
export interface UserRecord extends User {
    password: string
}

export interface LoginCredentials {
    email: string
    password: string
    rememberMe: boolean
}

export interface RegisterPayload {
    fullName: string
    email: string
    password: string
}

export interface PasswordRecoveryRequest {
    email: string
}

export interface AuthSession {
    token: string
    user: User
}
