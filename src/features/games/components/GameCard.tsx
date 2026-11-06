import type {Game} from "../types/game.types.ts";
import {formatCurrency} from "../../../utils/formatCurrency.ts";

type Props = {
    game: Game;
}

export default function GameCard({game}: Props) {
    return (
        <article>
            <h2>{game.title}</h2>
            <p>{game.genres.join(' . ')}</p>
            <strong>{formatCurrency(game.price)}</strong>
        </article>
    )
}