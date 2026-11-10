import {Heart, ShoppingCart, Star} from "lucide-react";
import type {Game} from "../types/game.types.ts";
import {formatCurrency} from "../../../utils/formatCurrency.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {toggleWishlist} from "../../wishlist/slices/wishlistSlice.ts";
import styles from "./GameCard.module.scss";

type Props = {
    game: Game;
}

export default function GameCard({game}: Props) {
    const dispatch = useAppDispatch()
    const isWishlisted = useAppSelector(state => state.wishlist.ids.includes(game.id))

    const hasDiscount = game.originalPrice > game.price
    const discountPercent = hasDiscount
        ? Math.round((1 - game.price / game.originalPrice) * 100)
        : 0

    function handleToggle() {
        dispatch(toggleWishlist(game.id))
    }

    return (
        <article className={styles.card}>
            <div className={styles.media}>
                <img className={styles.cover} src={game.cover} alt={game.title} loading="lazy"/>

                {hasDiscount && (
                    <span className={styles.discount}>-{discountPercent}%</span>
                )}

                <button
                    type="button"
                    className={isWishlisted
                        ? `${styles.wishlistButton} ${styles.wishlistActive}`
                        : styles.wishlistButton}
                    onClick={handleToggle}
                    aria-label={isWishlisted ? 'Bỏ khỏi Wishlist' : 'Thêm vào Wishlist'}
                    aria-pressed={isWishlisted}
                >
                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'}/>
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.tags}>
                    {game.genres.map(genre => (
                        <span key={genre} className={styles.tag}>{genre}</span>
                    ))}
                </div>

                <h2 className={styles.title}>{game.title}</h2>

                <div className={styles.rating}>
                    <Star size={14} className={styles.star}/>
                    <strong>{game.rating}</strong>
                    <span>({game.reviewCount.toLocaleString('en-US')})</span>
                </div>

                <div className={styles.footer}>
                    <div>
                        {hasDiscount && (
                            <span className={styles.oldPrice}>{formatCurrency(game.originalPrice)}</span>
                        )}
                        <span className={styles.price}>{formatCurrency(game.price)}</span>
                    </div>

                    <button type="button" className={styles.cartButton} aria-label="Thêm vào giỏ hàng">
                        <ShoppingCart size={18}/>
                    </button>
                </div>
            </div>
        </article>
    )
}