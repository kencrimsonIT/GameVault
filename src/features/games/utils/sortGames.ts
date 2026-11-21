import type {Game, SortOption} from "../types/game.types.ts";

export const PAGE_SIZE = 6

export const sortOptions: { value: SortOption, label: string }[] = [
    {value: 'popular', label: 'Phổ biến nhất'},
    {value: 'rating', label: 'Đánh giá cao nhất'},
    {value: 'newest', label: 'Mới phát hành'},
    {value: 'priceAsc', label: 'Giá: thấp đến cao'},
    {value: 'priceDesc', label: 'Giá: cao đến thấp'},
]

export function sortGames(games: Game[], sortBy: SortOption): Game[] {
    const sorted = [...games]

    switch (sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating)
        case 'newest':
            return sorted.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
        case 'priceAsc':
            return sorted.sort((a, b) => a.price - b.price)
        case 'priceDesc':
            return sorted.sort((a, b) => b.price - a.price)
        default:
            return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    }
}

export function paginate(games: Game[], page: number, pageSize: number): Game[] {
    const start = (page - 1) * pageSize
    return games.slice(start, start + pageSize)
}