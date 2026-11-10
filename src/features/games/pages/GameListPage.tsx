import {useState} from "react";
import {useGetGamesQuery} from "../api/gameApi.ts";
import GameCard from "../components/GameCard.tsx";
import GameSearch from "../components/GameSearch.tsx";
import {useAppSelector} from "../../../store/hooks.ts";
import styles from "./GameListPage.module.scss";

export default function GameListPage() {
    const {
        data: games = [],
        isLoading,
        error,
    } = useGetGamesQuery();
    const wishlistCount = useAppSelector(state => state.wishlist.ids.length)
    const [keyword, setKeyword] = useState('')

    const normalizedKeyword = keyword.trim().toLowerCase()
    const visibleGames = games.filter(game =>
        game.title.toLowerCase().includes(normalizedKeyword) ||
        game.developer.toLowerCase().includes(normalizedKeyword)
    )

    let content
    if (isLoading) {
        content = <p className={styles.status}>Đang tải game...</p>
    } else if (error) {
        content = <p className={styles.status}>Không tải được game. Hãy kiểm tra pnpm api.</p>
    } else if (visibleGames.length === 0) {
        content = <p className={styles.status}>Không tìm thấy game nào khớp với "{keyword}".</p>
    } else {
        content = (
            <div className={styles.grid}>
                {visibleGames.map(game => (
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
                        Hiển thị <strong>{visibleGames.length}</strong> / {games.length} trò chơi · <strong>{wishlistCount}</strong> yêu thích
                    </p>
                </header>

                <div className={styles.toolbar}>
                    <GameSearch value={keyword} onChange={setKeyword}/>
                </div>

                {content}
            </div>
        </main>
    )
}