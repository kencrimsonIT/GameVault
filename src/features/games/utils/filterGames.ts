import type {Game, GameFilters, PriceRange} from "../types/game.types.ts";

export const initialFilters: GameFilters = {
    genres: [],
    platforms: [],
    features: [],
    priceRange: 'all',
    onSaleOnly: false,
}

export const priceRangeOptions: { value: PriceRange, label: string }[] = [
    {value: 'all', label: 'Tất cả'},
    {value: 'free', label: 'Miễn phí'},
    {value: 'under200', label: 'Dưới 200.000₫'},
    {value: 'from200to500', label: '200.000₫ - 500.000₫'},
    {value: 'over500', label: 'Trên 500.000₫'},
]

function matchesAny(selected: string[], values: string[]): boolean {
    return selected.length === 0 || selected.some(item => values.includes(item))
}

function matchesPrice(range: PriceRange, price: number): boolean {
    switch (range) {
        case 'free':
            return price === 0
        case 'under200':
            return price > 0 && price < 200000
        case 'from200to500':
            return price >= 200000 && price <= 500000
        case 'over500':
            return price > 500000
        default:
            return true
    }
}

export function filterGames(games: Game[], filters: GameFilters): Game[] {
    return games.filter(game =>
        matchesAny(filters.genres, game.genres) &&
        matchesAny(filters.platforms, game.platforms) &&
        matchesAny(filters.features, game.features) &&
        matchesPrice(filters.priceRange, game.price) &&
        (!filters.onSaleOnly || game.price < game.originalPrice)
    )
}

export function getUniqueValues(games: Game[], pick: (game: Game) => string[]): string[] {
    return [...new Set(games.flatMap(pick))].sort((a, b) => a.localeCompare(b, 'vi'))
}

export function countActiveFilters(filters: GameFilters): number {
    return filters.genres.length
        + filters.platforms.length
        + filters.features.length
        + (filters.priceRange === 'all' ? 0 : 1)
        + (filters.onSaleOnly ? 1 : 0)
}