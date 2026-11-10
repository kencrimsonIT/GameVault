import {useGetGamesQuery} from "../api/gameApi.ts";
import GameCard from "../components/GameCard.tsx";
import {useAppSelector} from "../../../store/hooks.ts";
import styles from "./GameListPage.module.scss";

export default function GameListPage() {
    const {
        data: games = [],
        isLoading,
        error,
    } = useGetGamesQuery();
    const wishlistCount = useAppSelector(state => state.wishlist.ids.length)

    let content
    if (isLoading) {
        content = <p className={styles.status}>Đang tải game...</p>
    } else if (error) {
        content = <p className={styles.status}>Không tải được game. Hãy kiểm tra pnpm api.</p>
    } else {
        content = (
            <div className={styles.grid}>
                {games.map(game => (
                    <GameCard key={game.id} game={game}/>
                ))}
            </div>
        )
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>Kho dữ liệu số</p>
                        <h1 className={styles.title}>Khám phá Trò chơi</h1>
                    </div>
                    <p className={styles.summary}>
                        Hiển thị <strong>{games.length}</strong> trò chơi · <strong>{wishlistCount}</strong> yêu thích
                    </p>
                </header>

                {content}
            </div>
        </main>
    )
}