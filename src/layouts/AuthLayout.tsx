import {ArrowLeft, Terminal} from 'lucide-react'
import {Link, Outlet} from 'react-router-dom'
import styles from './AuthLayout.module.scss'

const AuthLayout = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link className={styles.brand} to="/">
                        <Terminal className={styles.brandIcon} size={24} aria-hidden="true"/>
                        <span>GameVault</span>
                    </Link>

                    <Link className={styles.backLink} to="/">
                        <ArrowLeft size={18} aria-hidden="true"/>
                        Trang chủ
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                <Outlet/>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <span className={styles.footerName}>GameVault</span>
                        <span className={styles.footerCopyright}>
                            © 2024 GameVault. Mọi quyền được bảo lưu.
                        </span>
                    </div>

                    <nav className={styles.footerLinks} aria-label="Liên kết chân trang">
                        <a href="#">Điều khoản dịch vụ</a>
                        <a href="#">Chính sách bảo mật</a>
                        <a href="#">Hỗ trợ khách hàng</a>
                        <a href="#">Giao dịch an toàn</a>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

export default AuthLayout
