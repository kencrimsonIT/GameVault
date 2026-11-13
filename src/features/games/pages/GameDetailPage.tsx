import {Link, useParams} from "react-router-dom";
import {Heart, ShoppingCart, Star} from "lucide-react";
import {useGetGameByIdQuery} from "../api/gameApi.ts";
import {formatCurrency} from "../../../utils/formatCurrency.ts";
import {formatDate} from "../../../utils/formatDate.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {toggleWishlist} from "../../wishlist/slices/wishlistSlice.ts";
import styles from "./GameDetailPage.module.scss";

export default function GameDetailPage() {
    const {id} = useParams()
    const gameId = Number(id)
    const isValidId = Number.isInteger(gameId) && gameId > 0

    const {data: game, isLoading, error} = useGetGameByIdQuery(gameId, {skip: !isValidId})
    const dispatch = useAppDispatch()
    const isWishlisted = useAppSelector(state => state.wishlist.ids.includes(gameId))

    if (isLoading) {
        return (
            <main className={styles.page}>
                <p className={styles.status}>Đang tải game...</p>
            </main>
        )
    }

    if (!isValidId || error || !game) {
        return (
            <main className={styles.page}>
                <p className={styles.status}>Không tìm thấy game này.</p>
                <Link to="/games" className={styles.backLink}>← Quay lại danh sách game</Link>
            </main>
        )
    }

    const hasDiscount = game.originalPrice > game.price
    const discountPercent = hasDiscount
        ? Math.round((1 - game.price / game.originalPrice) * 100)
        : 0

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <nav className={styles.breadcrumb} aria-label="Đường dẫn">
                    <Link to="/games">Games</Link>
                    <span>/</span>
                    <span>{game.title}</span>
                </nav>

                <div className={styles.top}>
                    <img className={styles.cover} src={game.cover} alt={game.title}/>

                    <section className={styles.info}>
                        <h1 className={styles.title}>{game.title}</h1>

                        <dl className={styles.meta}>
                            <div>
                                <dt>Nhà phát triển</dt>
                                <dd>{game.developer}</dd>
                            </div>
                            <div>
                                <dt>Ngày phát hành</dt>
                                <dd>{formatDate(game.releaseDate)}</dd>
                            </div>
                            <div>
                                <dt>Nền tảng</dt>
                                <dd>{game.platforms.join(', ')}</dd>
                            </div>
                            <div>
                                <dt>Tính năng</dt>
                                <dd>{game.features.join(', ')}</dd>
                            </div>
                        </dl>

                        <p className={styles.rating}>
                            <Star size={16} className={styles.star}/>
                            <strong>{game.rating}/5</strong>
                            <span>({game.reviewCount.toLocaleString('en-US')} đánh giá)</span>
                        </p>

                        <div className={styles.tags}>
                            {game.genres.map(genre => (
                                <span key={genre} className={styles.tag}>{genre}</span>
                            ))}
                        </div>

                        <div className={styles.priceBox}>
                            {hasDiscount && (
                                <>
                                    <span className={styles.discount}>-{discountPercent}%</span>
                                    <span className={styles.oldPrice}>{formatCurrency(game.originalPrice)}</span>
                                </>
                            )}
                            <strong className={styles.price}>{formatCurrency(game.price)}</strong>
                        </div>

                        <button type="button" className={styles.primaryButton} disabled>
                            <ShoppingCart size={18}/>
                            Thêm vào giỏ hàng
                        </button>
                        <p className={styles.note}>Giỏ hàng sẽ hoạt động khi ghép phần Cart của nhóm.</p>

                        <button
                            type="button"
                            className={isWishlisted ? `${styles.secondaryButton} ${styles.active}` : styles.secondaryButton}
                            aria-pressed={isWishlisted}
                            onClick={() => dispatch(toggleWishlist(game.id))}
                        >
                            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'}/>
                            {isWishlisted ? 'Đã có trong Wishlist' : 'Thêm vào Wishlist'}
                        </button>
                    </section>
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Giới thiệu</h2>
                    <p className={styles.description}>{game.description}</p>
                </section>
            </div>
        </main>
    )
}