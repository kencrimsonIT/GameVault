import type {Game} from "../types/game.types.ts";
import {formatCurrency} from "../../../utils/formatCurrency.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {toggleWishlist} from "../../wishlist/slices/wishlistSlice.ts";

type Props = {
    game: Game;
}

export default function GameCard({game}: Props) {
    const dispatch = useAppDispatch()
    const isWishlisted = useAppSelector(state => state.wishlist.ids.includes(game.id))

    function handleToggle() {
        dispatch(toggleWishlist(game.id))
    }

    return (
        <article>
            <h2>{game.title}</h2>
            <p>{game.genres.join(' . ')}</p>
            <strong>{formatCurrency(game.price)}</strong>
            <button type="button" onClick={handleToggle}>
                {isWishlisted ? 'Bỏ yêu thích' : 'Yêu thích'}
            </button>
        </article>
    )
}