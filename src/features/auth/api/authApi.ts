import axios from 'axios'
import { axiosInstance } from '../../../services/axios'
import type {
    AuthSession,
    LoginCredentials,
    RegisterPayload,
    User,
    UserRecord,
} from '../types/auth.types'

export class AuthApiError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AuthApiError'
    }
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const toUser = (record: UserRecord): User => {
    const { password: _password, ...user } = record

    return user
}

const createToken = () => globalThis.crypto.randomUUID()

const createUserCode = () => `VAULT-${Math.floor(Math.random() * 90000) + 10000}`

const createGamertag = (fullName: string, email: string) => {
    const fromName = fullName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')

    return fromName || email.split('@')[0]
}

const findUserByEmail = async (email: string) => {
    const { data } = await axiosInstance.get<UserRecord[]>('/users', {
        params: { email },
    })

    return data[0]
}

export const authApi = {
    async login(credentials: LoginCredentials): Promise<AuthSession> {
        const email = normalizeEmail(credentials.email)
        const record = await findUserByEmail(email)

        if (!record || record.password !== credentials.password) {
            throw new AuthApiError('Email hoặc mật khẩu không chính xác')
        }

        if (record.status === 'suspended') {
            throw new AuthApiError('Tài khoản của bạn đã bị tạm khóa')
        }

        return {
            token: createToken(),
            user: toUser(record),
        }
    },

    async register(payload: RegisterPayload): Promise<AuthSession> {
        const email = normalizeEmail(payload.email)
        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            throw new AuthApiError('Email này đã được sử dụng')
        }

        const { data: users } = await axiosInstance.get<UserRecord[]>('/users')
        const nextId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1
        const now = new Date().toISOString()

        const newUser: UserRecord = {
            id: nextId,
            userCode: createUserCode(),
            fullName: payload.fullName.trim(),
            displayName: payload.fullName.trim(),
            gamertag: `${createGamertag(payload.fullName, email)}_${nextId}`,
            gamertagVerified: false,
            email,
            password: payload.password,
            phone: '',
            avatar: '',
            country: 'VN',
            currency: 'VND',
            role: 'user',
            rank: 'ROOKIE',
            isVerified: false,
            walletBalance: 0,
            rewardPoints: 0,
            ownedKeysCount: 0,
            wishlist: [],
            authProviders: ['email'],
            lastLoginIp: '',
            status: 'active',
            createdAt: now,
            updatedAt: now,
        }

        const { data: createdUser } = await axiosInstance.post<UserRecord>('/users', newUser)

        return {
            token: createToken(),
            user: toUser(createdUser),
        }
    },
}

export const getAuthErrorMessage = (error: unknown) => {
    if (error instanceof AuthApiError) {
        return error.message
    }

    if (axios.isAxiosError(error) && !error.response) {
        return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối.'
    }

    return 'Đã xảy ra lỗi. Vui lòng thử lại.'
}
