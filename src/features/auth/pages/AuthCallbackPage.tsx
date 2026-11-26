import { AlertCircle, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import {
    consumeSocialRedirectPath,
    getSocialAuthErrorMessage,
} from '../api/socialAuth'
import { loginWithSocial } from '../slices/authSlice'
import styles from './AuthCallbackPage.module.scss'

const AuthCallbackPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isActive = true

        const finishLogin = async () => {
            try {
                await dispatch(loginWithSocial()).unwrap()

                if (isActive) {
                    navigate(consumeSocialRedirectPath(), { replace: true })
                }
            } catch (authError) {
                if (isActive) {
                    setError(
                        typeof authError === 'string'
                            ? authError
                            : getSocialAuthErrorMessage(authError),
                    )
                }
            }
        }

        void finishLogin()

        return () => {
            isActive = false
        }
    }, [dispatch, navigate])

    return (
        <div className={styles.card}>
            <div className={styles.iconWrap}>
                {error ? (
                    <AlertCircle className={styles.errorIcon} size={28} aria-hidden="true"/>
                ) : (
                    <ShieldCheck className={styles.successIcon} size={28} aria-hidden="true"/>
                )}
            </div>

            <h1 className={styles.title}>
                {error ? 'Đăng nhập chưa hoàn tất' : 'Đang hoàn tất đăng nhập'}
            </h1>

            {error ? (
                <>
                    <div className={styles.alert} role="alert">
                        <AlertCircle className={styles.alertIcon} size={18} aria-hidden="true"/>
                        <span>{error}</span>
                    </div>

                    <Link className={styles.backLink} to="/auth">
                        <ArrowLeft size={16} aria-hidden="true"/>
                        Quay lại trang đăng nhập
                    </Link>
                </>
            ) : (
                <>
                    <p className={styles.subtitle}>
                        Đang xác thực tài khoản mạng xã hội của bạn với GameVault. Vui lòng
                        không đóng cửa sổ này.
                    </p>
                    <Loader2 className={styles.spinner} size={22} aria-hidden="true"/>
                </>
            )}
        </div>
    )
}

export default AuthCallbackPage
