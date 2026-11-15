import {useState} from "react";
import {useGetGamesQuery} from "../api/gameApi.ts";
import GameCard from "../components/GameCard.tsx";
import GameFilter from "../components/GameFilter.tsx";
import GamePagination from "../components/GamePagination.tsx";
import GameSearch from "../components/GameSearch.tsx";
import GameSort from "../components/GameSort.tsx";
import type {GameFilters, SortOption} from "../types/game.types.ts";
import {countActiveFilters, filterGames, getUniqueValues, initialFilters} from "../utils/filterGames.ts";
import {PAGE_SIZE, paginate, sortGames} from "../utils/sortGames.ts";
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
    const [filters, setFilters] = useState<GameFilters>(initialFilters)
    const [sortBy, setSortBy] = useState<SortOption>('popular')
    const [page, setPage] = useState(1)

    const filterOptions = {
        genres: getUniqueValues(games, game => game.genres),
        platforms: getUniqueValues(games, game => game.platforms),
        features: getUniqueValues(games, game => game.features),
    }

    // 1. Lọc -> 2. Tìm kiếm -> 3. Sắp xếp -> 4. Cắt trang
    const normalizedKeyword = keyword.trim().toLowerCase()
    const matchedGames = filterGames(games, filters).filter(game =>
        game.title.toLowerCase().includes(normalizedKeyword) ||
        game.developer.toLowerCase().includes(normalizedKeyword)
    )
    const sortedGames = sortGames(matchedGames, sortBy)
    const totalPages = Math.max(1, Math.ceil(sortedGames.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const pageGames = paginate(sortedGames, currentPage, PAGE_SIZE)

    function handleKeywordChange(value: string) {
        setKeyword(value)
        setPage(1)
    }

    function handleFiltersChange(nextFilters: GameFilters) {
        setFilters(nextFilters)
        setPage(1)
    }

    function handleSortChange(value: SortOption) {
        setSortBy(value)
        setPage(1)
    }

    function handlePageChange(nextPage: number) {
        setPage(nextPage)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    let content
    if (isLoading) {
        content = <p className={styles.status}>Đang tải game...</p>
    } else if (error) {
        content = <p className={styles.status}>Không tải được game. Hãy kiểm tra pnpm api.</p>
    } else if (sortedGames.length === 0) {
        content = <p className={styles.status}>Không có game nào phù hợp. Hãy bỏ bớt bộ lọc hoặc đổi từ khóa.</p>
    } else {
        content = (
            <>
                <div className={styles.grid}>
                    {pageGames.map(game => (
                        <GameCard key={game.id} game={game}/>
                    ))}
                </div>
                <GamePagination
                    page={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedGames.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={handlePageChange}
                />
            </>
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
                        Hiển thị <strong>{sortedGames.length}</strong> / {games.length} trò chơi {''}
                        · <strong>{wishlistCount}</strong> yêu thích
                    </p>
                </header>

                <div className={styles.toolbar}>
                    <GameSearch value={keyword} onChange={handleKeywordChange}/>
                    <GameSort value={sortBy} onChange={handleSortChange}/>
                </div>

                <div className={styles.layout}>
                    <GameFilter
                        options={filterOptions}
                        filters={filters}
                        activeCount={countActiveFilters(filters)}
                        onChange={handleFiltersChange}
                        onReset={() => handleFiltersChange(initialFilters)}
                    />
                    <section>{content}</section>
                </div>
            </div>
        </main>
    )
}