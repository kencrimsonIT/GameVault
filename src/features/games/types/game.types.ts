export type Requirement ={
    label: string
    value: string
}
export type Game = {
    id: number
    title: string
    developer: string
    releaseDate: string
    price: number
    originalPrice: number
    genres: string[]
    platforms: string[]
    features: string[]
    rating: number
    reviewCount: number
    cover: string
     screenshots: string[]
    description: string
    requirements?: {
        minimum: Requirement[]
        recommended: Requirement[]
    }
}
export type PriceRange = 'all' | 'free' | 'under200' | 'from200to500' | 'over500'

export type GameFilters = {
    genres: string[]
    platforms: string[]
    features: string[]
    priceRange: PriceRange
    onSaleOnly: boolean
}