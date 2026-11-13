import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { login, selectAuthError, selectAuthStatus } from '../slices/authSlice'
import { loginSchema } from '../validation'
import type { LoginFormValues } from '../validation'
import styles from './AuthForm.module.scss'

interface LoginFormProps {
    onSwitchToRegister: () => void
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const authError = useAppSelector(selectAuthError)
    const status = useAppSelector(selectAuthStatus)
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'commander@gamevault.io',
            password: 'Vault@Commander24!',
            rememberMe: true,
        },
    })

    const from = (location.state as { from?: string } | null)?.from ?? '/'
    const isPending = isSubmitting || status === 'loading'

    const onSubmit = handleSubmit(async (values) => {
        try {
            await dispatch(login(values)).unwrap()
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
                <label className={styles.label} htmlFor="login-email">
                    Địa chỉ Email
                </label>
                <div className={styles.inputWrap}>
                    <Mail className={styles.inputIcon} size={18} aria-hidden="true"/>
                    <input
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Nhập email của bạn"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'login-email-error' : undefined}
                        {...register('email')}
                    />
                </div>
                {errors.email && (
                    <p className={styles.fieldError} id="login-email-error">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="login-password">
                    Mật khẩu
                </label>
                <div className={styles.inputWrap}>
                    <Lock className={styles.inputIcon} size={18} aria-hidden="true"/>
                    <input
                        className={`${styles.input} ${styles.inputWithToggle} ${
                            errors.password ? styles.inputError : ''
                        }`}
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="••••••••••••"
                        aria-invalid={errors.password ? true : undefined}
                        aria-describedby={errors.password ? 'login-password-error' : undefined}
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
                    <p className={styles.fieldError} id="login-password-error">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className={styles.utilities}>
                <label className={styles.checkboxLabel}>
                    <input className={styles.checkbox} type="checkbox" {...register('rememberMe')}/>
                    <span>Ghi nhớ đăng nhập</span>
                </label>
                <a className={styles.link} href="#">
                    Quên mật khẩu?
                </a>
            </div>

            <button className={styles.submit} type="submit" disabled={isPending}>
                <span>{isPending ? 'Đang đăng nhập...' : 'Đăng nhập ngay'}</span>
                {isPending ? (
                    <Loader2 className={styles.spinner} size={18} aria-hidden="true"/>
                ) : (
                    <ArrowRight size={18} aria-hidden="true"/>
                )}
            </button>

            <p className={styles.hint}>
                Chưa có tài khoản?{' '}
                <button className={styles.hintButton} type="button" onClick={onSwitchToRegister}>
                    Tạo tài khoản mới
                </button>
            </p>
        </form>
    )
}

export default LoginForm