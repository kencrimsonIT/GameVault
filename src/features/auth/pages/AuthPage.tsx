import {Gamepad2, Globe, MessageSquare, Gamepad} from 'lucide-react'
import {useState} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../store/hooks'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import {clearAuthError, selectIsAuthenticated} from '../slices/authSlice'
import styles from './AuthPage.module.scss'

type AuthTab = 'login' | 'register'

const AuthPage = () => {
    const [tab, setTab] = useState<AuthTab>('login')
    const dispatch = useAppDispatch()
    const location = useLocation()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    const from = (location.state as { from?: string } | null)?.from ?? '/'

    if (isAuthenticated) {
        return <Navigate to={from} replace/>
    }

    const switchTab = (nextTab: AuthTab) => {
        if (nextTab === tab) {
            return
        }

        setTab(nextTab)
        dispatch(clearAuthError())
    }

    const isLogin = tab === 'login'

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                    <Gamepad2 size={24} aria-hidden="true"/>
                </div>
                <h1 className={styles.title}>
                    {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
                </h1>
                <p className={styles.subtitle}>
                    {isLogin
                        ? 'Truy cập vào kho game kỹ thuật số của bạn trên GameVault'
                        : 'Tham gia hệ sinh thái game bản quyền hiệu suất cao GameVault'}
                </p>
            </div>

            <div className={styles.tabs} role="tablist" aria-label="Đăng nhập hoặc đăng ký">
                <button
                    className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`}
                    id="tab-login"
                    type="button"
                    role="tab"
                    aria-selected={isLogin}
                    aria-controls="form-login"
                    onClick={() => switchTab('login')}
                >
                    Đăng nhập
                </button>
                <button
                    className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`}
                    id="tab-register"
                    type="button"
                    role="tab"
                    aria-selected={!isLogin}
                    aria-controls="form-register"
                    onClick={() => switchTab('register')}
                >
                    Đăng ký
                </button>
            </div>

            <div
                id={isLogin ? 'form-login' : 'form-register'}
                role="tabpanel"
                aria-labelledby={isLogin ? 'tab-login' : 'tab-register'}
            >
                {isLogin ? (
                    <LoginForm onSwitchToRegister={() => switchTab('register')}/>
                ) : (
                    <RegisterForm/>
                )}
            </div>

            <div className={styles.divider}>
                <span className={styles.dividerLabel}>Hoặc tiếp tục với</span>
            </div>

            <div className={styles.providers}>
                <button
                    className={styles.providerButton}
                    type="button"
                    disabled
                    title="Đăng nhập bằng Steam sắp ra mắt"
                >
                    <Gamepad size={20} aria-hidden="true"/>
                    <span>Steam</span>
                </button>
                <button
                    className={styles.providerButton}
                    type="button"
                    disabled
                    title="Đăng nhập bằng Discord sắp ra mắt"
                >
                    <MessageSquare size={20} aria-hidden="true"/>
                    <span>Discord</span>
                </button>
                <button
                    className={styles.providerButton}
                    type="button"
                    disabled
                    title="Đăng nhập bằng Google sắp ra mắt"
                >
                    <Globe size={20} aria-hidden="true"/>
                    <span>Google</span>
                </button>
            </div>

            <p className={styles.terms}>
                Bằng việc tiếp tục, bạn đồng ý với{' '}
                <a className={styles.termsLink} href="#">
                    Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a className={styles.termsLink} href="#">
                    Chính sách bảo mật
                </a>
                .
            </p>
        </div>
    )
}

export default AuthPage
