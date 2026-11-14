import { zodResolver } from '@hookform/resolvers/zod'
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Loader2,
    LockKeyhole,
    Mail,
    Send,
    ShieldCheck,
    Timer,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authApi, getAuthErrorMessage } from '../api/authApi'
import { forgotPasswordSchema } from '../validation'
import type { ForgotPasswordFormValues } from '../validation'
import formStyles from '../components/AuthForm.module.scss'
import styles from './ForgotPasswordPage.module.scss'

const ForgotPasswordPage = () => {
    const [isSent, setIsSent] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const emailField = register('email')

    const onSubmit = handleSubmit(async (values) => {
        setError(null)

        try {
            await authApi.requestPasswordReset(values)
            setIsSent(true)
        } catch (requestError) {
            setError(getAuthErrorMessage(requestError))
        }
    })

    return (
        <div className={styles.card}>
            <div className={styles.iconWrap}>
                <LockKeyhole size={30} aria-hidden="true"/>
                <span className={styles.cornerTag} aria-hidden="true"/>
            </div>

            <div className={styles.header}>
                <h1 className={styles.title}>Khôi phục mật khẩu</h1>
                <p className={styles.subtitle}>
                    Nhập địa chỉ email liên kết với tài khoản GameVault của bạn. Chúng tôi sẽ gửi
                    một liên kết bảo mật để đặt lại mật khẩu.
                </p>
            </div>

            {isSent && (
                <div className={styles.success} role="status">
                    <CheckCircle2 className={styles.successIcon} size={20} aria-hidden="true"/>
                    <p className={styles.successText}>
                        Đã gửi liên kết khôi phục thành công tới email của bạn! Vui lòng kiểm tra
                        hộp thư đến (và thư mục rác).
                    </p>
                </div>
            )}

            <form className={formStyles.form} onSubmit={onSubmit} noValidate>
                {error && (
                    <div className={formStyles.alert} role="alert">
                        <AlertCircle className={formStyles.alertIcon} size={18} aria-hidden="true"/>
                        <span>{error}</span>
                    </div>
                )}

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="forgot-email">
                        Địa chỉ Email
                    </label>
                    <div className={formStyles.inputWrap}>
                        <Mail className={formStyles.inputIcon} size={18} aria-hidden="true"/>
                        <input
                            className={`${formStyles.input} ${
                                errors.email ? formStyles.inputError : ''
                            }`}
                            id="forgot-email"
                            type="email"
                            autoComplete="email"
                            placeholder="tenban@domain.com"
                            aria-invalid={errors.email ? true : undefined}
                            aria-describedby={errors.email ? 'forgot-email-error' : undefined}
                            {...emailField}
                            onChange={(event) => {
                                emailField.onChange(event)
                                setIsSent(false)
                            }}
                        />
                    </div>
                    {errors.email && (
                        <p className={formStyles.fieldError} id="forgot-email-error">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <button className={formStyles.submit} type="submit" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Đang gửi liên kết...' : 'Gửi liên kết khôi phục'}</span>
                    {isSubmitting ? (
                        <Loader2 className={formStyles.spinner} size={18} aria-hidden="true"/>
                    ) : (
                        <Send size={18} aria-hidden="true"/>
                    )}
                </button>
            </form>

            <div className={styles.meta}>
                <span className={styles.metaItem}>
                    <ShieldCheck size={16} aria-hidden="true"/>
                    Bảo mật 256-bit
                </span>
                <span className={styles.metaItem}>
                    <Timer size={16} aria-hidden="true"/>
                    Hết hạn trong 15 phút
                </span>
            </div>

            <div className={styles.footer}>
                <Link className={styles.backLink} to="/auth">
                    <ArrowLeft size={16} aria-hidden="true"/>
                    Quay lại trang Đăng nhập / Đăng ký
                </Link>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
