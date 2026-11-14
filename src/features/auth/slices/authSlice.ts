import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authStorage } from '../../../services/storage'
import { authApi, getAuthErrorMessage } from '../api/authApi'
import type {
    AuthSession,
    LoginCredentials,
    RegisterPayload,
    User,
} from '../types/auth.types'

export type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface AuthState {
    user: User | null
    token: string | null
    status: AuthStatus
    error: string | null
}

const session = authStorage.read()

const initialState: AuthState = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    status: 'idle',
    error: null,
}

export const login = createAsyncThunk<AuthSession, LoginCredentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const authSession = await authApi.login(credentials)

            authStorage.save(authSession, credentials.rememberMe)

            return authSession
        } catch (error) {
            return rejectWithValue(getAuthErrorMessage(error))
        }
    },
)

export const register = createAsyncThunk<AuthSession, RegisterPayload, { rejectValue: string }>(
    'auth/register',
    async (payload, { rejectWithValue }) => {
        try {
            const authSession = await authApi.register(payload)

            authStorage.save(authSession, true)

            return authSession
        } catch (error) {
            return rejectWithValue(getAuthErrorMessage(error))
        }
    },
)

export const logout = createAsyncThunk('auth/logout', async () => {
    authStorage.clear()
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload ?? 'Không thể đăng nhập. Vui lòng thử lại.'
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload ?? 'Không thể tạo tài khoản. Vui lòng thử lại.'
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.status = 'idle'
                state.error = null
            })
    },
})

export const { clearAuthError } = authSlice.actions

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
export const selectIsAuthenticated = (state: { auth: AuthState }) => Boolean(state.auth.user)

export default authSlice.reducer
