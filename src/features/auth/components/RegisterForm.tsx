import { zodResolver } from '@hookform/resolvers/zod'
import {
    AlertCircle,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
    ShieldCheck,
    User,
    UserPlus,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { register as registerAccount, selectAuthError, selectAuthStatus } from '../slices/authSlice'
import { registerSchema } from '../validation'
import type { RegisterFormValues } from '../validation'
import styles from './AuthForm.module.scss'

const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const authError = useAppSelector(selectAuthError)
    const status = useAppSelector(selectAuthStatus)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const from = (location.state as { from?: string } | null)?.from ?? '/'
    const isPending = isSubmitting || status === 'loading'

    const onSubmit = handleSubmit(async ({ confirmPassword: _confirmPassword, ...payload }) => {
        try {
            await dispatch(registerAccount(payload)).unwrap()
            navigate(from, { replace: true })
        } catch {
            // The rejected thunk already exposes a user-facing message in the store.
        }
    })

    return (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
            {authError && (
                <div className={styles.alert} role="alert">
                    <AlertCircle className={styles.alertIcon} size={18} aria-hidden="true"/>
                    <span>{authError}</span>
                </div>
            )}

            <div className={styles.field}>
                <label className={styles.label} htmlFor="register-name">
                    Họ và tên
                </label>
                <div className={styles.inputWrap}>
                    <User className={styles.inputIcon} size={18} aria-hidden="true"/>
                    <input
                        className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                        id="register-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Nguyễn Văn A"
                        aria-invalid={errors.fullName ? true : undefined}
                        aria-describedby={errors.fullName ? 'register-name-error' : undefined}
                        {...register('fullName')}
                    />
                </div>
                {errors.fullName && (
                    <p className={styles.fieldError} id="register-name-error">
                        {errors.fullName.message}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="register-email">
                    Địa chỉ Email
                </label>
                <div className={styles.inputWrap}>
                    <Mail className={styles.inputIcon} size={18} aria-hidden="true"/>
                    <input
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Nhập email của bạn"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'register-email-error' : undefined}
                        {...register('email')}
                    />
                </div>
                {errors.email && (
                    <p className={styles.fieldError} id="register-email-error">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="register-password">
                    Mật khẩu
                </label>
                <div className={styles.inputWrap}>
                    <Lock className={styles.inputIcon} size={18} aria-hidden="true"/>
                    <input
                        className={`${styles.input} ${styles.inputWithToggle} ${
                            errors.password ? styles.inputError : ''
                        }`}
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Tối thiểu 8 ký tự"
                        aria-invalid={errors.password ? true : undefined}
                        aria-describedby={errors.password ? 'register-password-error' : undefined}
                        {...register('password')}
                    />
                    <button
                        className={styles.toggle}
                        type="button"
                        onClick={() => setShowPassword((visible) => !visible)}
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>
                {errors.password && (
                    <p className={styles.fieldError} id="register-password-error">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="register-confirm">
                    Xác nhận mật khẩu
                </label>
                <div className={styles.inputWrap}>
                    <ShieldCheck className={styles.inputIcon} size={18} aria-hidden="true"/>
                    <input
                        className={`${styles.input} ${styles.inputWithToggle} ${
                            errors.confirmPassword ? styles.inputError : ''
                        }`}
                        id="register-confirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Nhập lại mật khẩu"
                        aria-invalid={errors.confirmPassword ? true : undefined}
                        aria-describedby={
                            errors.confirmPassword ? 'register-confirm-error' : undefined
                        }
                        {...register('confirmPassword')}
                    />
                    <button
                        className={styles.toggle}
                        type="button"
                        onClick={() => setShowConfirmPassword((visible) => !visible)}
                        aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                        {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className={styles.fieldError} id="register-confirm-error">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <button className={styles.submit} type="submit" disabled={isPending}>
                <span>{isPending ? 'Đang tạo tài khoản...' : 'Tạo tài khoản GameVault'}</span>
                {isPending ? (
                    <Loader2 className={styles.spinner} size={18} aria-hidden="true"/>
                ) : (
                    <UserPlus size={18} aria-hidden="true"/>
                )}
            </button>
        </form>
    )
}

export default RegisterForm