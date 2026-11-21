import axios from 'axios'
import { env } from '../config/env'
import { authStorage } from './storage'

export const axiosInstance = axios.create({
    baseURL: env.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use((config) => {
    const session = authStorage.read()

    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})
