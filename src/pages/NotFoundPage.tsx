import {Flame, Gamepad2, Home, LayoutGrid, Search, ShoppingCart, User} from 'lucide-react'
import type {FormEvent} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

type TrendingGame = {
    title: string
    genre: string
    price: string
    cover: string
    tag?: string
    priceMuted?: boolean
}

const trendingGames: TrendingGame[] = [
    {
        title: 'Cyber Drift 2088',
        genre: 'Sci-Fi • Hành động',
        price: '540.000₫',
        tag: '-25%',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2_f1rgXshz6bstonPVGjuxZZWplShgzgD5TrYo5zss-clMqLWi_QVxNFT6BENzDr4hnTGwtoirTnRIV4Q1k3zlOwTlSQKR7P9uvQQu-cKDaYv4rPNZ88Qb6o_o_YQG7VWdB-1EUWi2lLt2lbc_AHnDkeL3RmkDWLDTctosNpmr0SxaOyemuFbuuUPLmSa3lJijD0dCQBqX-u0pX4KRrcifYLIXEuG6-E0nLfGAP8',
    },
    {
        title: 'Eldritch Void',
        genre: 'Souls-like • RPG',
        price: '890.000₫',
        tag: 'HOT',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALoU_e15aJcIpFKgAnDsikaUrAoiW28myLowZBLQsKA-Tyq-kjmC_Ku-4sNyIAKHpw9Hr8kUlYE3gVAvEpv1asJ-3gbQfF81BKUzfIOCaRXPRba5RDPgRiZgmPIlN3bp2Mj4i-6oXrKpVOeGAqSQCgCwsVDdgeswg9Jm1G2hRwKWn_UNot1KKsF5Gxu0P_gmrddWZq5UbH3_L6VLN5qGx4B-nor5hUCPl2Uo9CCU0',
    },
    {
        title: 'Quantum Protocol',
        genre: 'Chiến thuật • Co-op',
        price: 'Miễn phí',
        priceMuted: true,
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgC_7bY3f0sk_UNO_AJ3D2UniPnnLYMn37cnQl6S_xJXbVmBcVDcea04QsECdmSlBzclj5nP04y7lixNX-qJwIKBn9K4Icu39U8-1AQI1Vd_GUy7fHv7sbql1N_BTXN0wWvYekruo4qs5DDgNG-s6JCrSFJnZm8efqrQ5pdhp1Grnc7Ua-4AsfYk-pzxF8vMgfibZcvVLnYeXZg6VMVu6MvuKMlLu6dVCTiNT0gJo',
    },
]

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const term = String(new FormData(event.currentTarget).get('q') ?? '').trim()
        navigate(term ? `/games?q=${encodeURIComponent(term)}` : '/games')
    }

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
                                placeholder="Tìm kiếm game..."
                                aria-label="Tìm kiếm game"
                            />
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
                <section className={styles.content} aria-labelledby="not-found-title">
                    <div className={styles.errorVisual}>
                        <span className={styles.errorCode} aria-hidden="true">
                            404
                        </span>
                        <div className={styles.signalBadge}>
                            <span className={styles.signalDot} aria-hidden="true"/>
                            <Gamepad2 className={styles.signalIcon} size={22} aria-hidden="true"/>
                            <span>Tín hiệu bị ngắt</span>
                        </div>
                    </div>

                    <h1 className={styles.title} id="not-found-title">
                        Không tìm thấy trang
                    </h1>

                    <p className={styles.description}>
                        Đường dẫn bạn truy cập có thể đã bị thay đổi, chuyển dời hoặc không còn tồn tại
                        trên GameVault.
                    </p>

                    <form className={styles.searchForm} onSubmit={handleSearch}>
                        <div className={styles.searchField}>
                            <Gamepad2 className={styles.searchFieldIcon} size={20} aria-hidden="true"/>
                            <input
                                className={styles.searchFieldInput}
                                type="text"
                                name="q"
                                placeholder="Nhập tên tựa game bạn đang tìm..."
                                aria-label="Tên tựa game cần tìm"
                            />
                            <button className={styles.searchSubmit} type="submit">
                                <Search size={16} aria-hidden="true"/>
                                <span>Tìm kiếm</span>
                            </button>
                        </div>
                    </form>

                    <div className={styles.buttons}>
                        <Link className={styles.primaryButton} to="/">
                            <Home size={18} aria-hidden="true"/>
                            Về trang chủ
                        </Link>
                        <Link className={styles.secondaryButton} to="/games">
                            <LayoutGrid size={18} aria-hidden="true"/>
                            Khám phá danh sách Games
                        </Link>
                    </div>

                    <div className={styles.suggested}>
                        <div className={styles.suggestedHeader}>
                            <div className={styles.suggestedTitle}>
                                <Flame className={styles.suggestedIcon} size={18} aria-hidden="true"/>
                                <span>Có thể bạn quan tâm</span>
                            </div>
                            <span className={styles.trendingLabel}>Thịnh hành</span>
                        </div>

                        <div className={styles.gamesGrid}>
                            {trendingGames.map((game) => (
                                <Link className={styles.gameCard} to="/games" key={game.title}>
                                    <img
                                        className={styles.gameCover}
                                        src={game.cover}
                                        alt={`Ảnh bìa ${game.title}`}
                                        width={48}
                                        height={56}
                                        loading="lazy"
                                    />
                                    <div className={styles.gameInfo}>
                                        <p className={styles.gameTitle}>{game.title}</p>
                                        <p className={styles.gameGenre}>{game.genre}</p>
                                        <div className={styles.gameMeta}>
                                            {game.tag && (
                                                <span
                                                    className={
                                                        game.tag === 'HOT'
                                                            ? styles.hotBadge
                                                            : styles.discountBadge
                                                    }
                                                >
                                                    {game.tag}
                                                </span>
                                            )}
                                            <span
                                                className={
                                                    game.priceMuted ? styles.priceMuted : styles.price
                                                }
                                            >
                                                {game.price}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <span className={styles.footerName}>GameVault</span>
                        <span className={styles.footerDivider} aria-hidden="true">
                            •
                        </span>
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

export default NotFoundPage
