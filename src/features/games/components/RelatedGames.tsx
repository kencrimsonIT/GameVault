import {useGetGamesQuery} from "../api/gameApi.ts";
import type {Game} from "../types/game.types.ts";
import {getRelatedGames} from "../utils/relatedGames.ts";
import GameCard from "./GameCard.tsx";
import styles from "./RelatedGames.module.scss";

type Props = {
    game: Game
}

export default function RelatedGames({game}: Props) {
    const {data: games = []} = useGetGamesQuery()
    const relatedGames = getRelatedGames(games, game)

    if (relatedGames.length === 0) {
        return null
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Trò chơi liên quan</h2>
            <div className={styles.grid}>
                {relatedGames.map(item => (
                    <GameCard key={item.id} game={item}/>
                ))}
            </div>
        </section>
    )
}