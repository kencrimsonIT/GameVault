import {Headset, Home, Lock, LogIn, Search, ShoppingCart, User} from 'lucide-react'
import {Link} from 'react-router-dom'
import styles from './ForbiddenPage.module.scss'

const ForbiddenPage = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerGroup}>
                        <Link className={styles.brand} to="/">
                            <span className={styles.brandMark} aria-hidden="true"/>
                            GameVault
                        </Link>

                        <nav className={styles.nav} aria-label="Điều hướng chính">
                            <Link className={styles.navLink} to="/">
                                Trang chủ
                            </Link>
                            <Link className={styles.navLink} to="/games">
                                Games
                            </Link>
                            <Link className={styles.navLink} to="/wishlist">
                                Wishlist
                            </Link>
                        </nav>
                    </div>

                    <div className={styles.headerActions}>
                        <div className={styles.search}>
                            <Search className={styles.searchIcon} size={18} aria-hidden="true"/>
                            <input
                                className={styles.searchInput}
                                type="search"
                                placeholder="Tìm kiếm trò chơi..."
                                aria-label="Tìm kiếm trò chơi"
                            />
                            <kbd className={styles.searchShortcut}>⌘K</kbd>
                        </div>

                        <div className={styles.iconGroup}>
                            <button className={styles.iconButton} type="button" aria-label="Giỏ hàng">
                                <ShoppingCart size={20} aria-hidden="true"/>
                            </button>
                            <button className={styles.iconButton} type="button" aria-label="Tài khoản">
                                <User size={20} aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} aria-hidden="true"/>
                        <span>403 • ACCESS_DENIED</span>
                    </div>

                    <div className={styles.errorCodeWrap}>
                        <span className={styles.errorCode}>403</span>
                        <Lock className={styles.errorLock} size={28} strokeWidth={2.5} aria-hidden="true"/>
                    </div>

                    <h1 className={styles.title}>Bạn không có quyền truy cập trang này</h1>

                    <p className={styles.description}>
                        Khu vực này yêu cầu quyền quản trị viên hoặc bạn cần đăng nhập bằng tài khoản
                        có đặc quyền để tiếp tục.
                    </p>

                    <section className={styles.diagnostics} aria-label="Thông tin chẩn đoán">
                        <div className={styles.diagnosticsHeader}>
                            <span className={styles.diagnosticsLabel}>Mã tham chiếu phiên</span>
                            <span className={styles.diagnosticsReference}>GV-ERR-SEC-40392</span>
                        </div>

                        <div className={styles.diagnosticsGrid}>
                            <div>
                                <span className={styles.diagnosticsKey}>Tài nguyên:</span> /admin/vault-matrix
                            </div>
                            <div className={styles.diagnosticsRight}>
                                <span className={styles.diagnosticsKey}>Quyền hạn:</span> Level 0 (Guest)
                            </div>
                        </div>
                    </section>

                    <div className={styles.buttons}>
                        <Link className={styles.primaryButton} to="/">
                            <Home size={18} aria-hidden="true"/>
                            Về trang chủ
                        </Link>
                        <Link className={styles.secondaryButton} to="/login">
                            <LogIn size={18} aria-hidden="true"/>
                            Đăng nhập tài khoản
                        </Link>
                    </div>

                    <p className={styles.support}>
                        <Headset size={16} aria-hidden="true"/>
                        <span>
              Cần hỗ trợ? Liên hệ bộ phận{' '}
                            <a className={styles.supportLink} href="#">
                Chăm sóc khách hàng GameVault 24/7
              </a>
              .
            </span>
                    </p>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <span className={styles.footerName}>GameVault</span>
                        <span className={styles.footerDivider} aria-hidden="true">
              |
            </span>
                        <span className={styles.footerCopyright}>© 2024 GameVault. Mọi quyền được bảo lưu.</span>
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

export default ForbiddenPage
