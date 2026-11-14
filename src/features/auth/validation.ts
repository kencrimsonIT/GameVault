import { z } from 'zod'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailSchema = z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập email')
    .regex(EMAIL_PATTERN, 'Email không hợp lệ')

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
    rememberMe: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
            .max(60, 'Họ và tên không được quá 60 ký tự'),
        email: emailSchema,
        password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
        confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    })

export type RegisterFormValues = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
    email: emailSchema,
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
