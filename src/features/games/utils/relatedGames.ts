import type {Game} from "../types/game.types.ts";

function countShared(a: string[], b: string[]): number {
    return a.filter(item => b.includes(item)).length
}

export function getRelatedGames(games: Game[], current: Game, limit = 4): Game[] {
    return games
        .filter(game => game.id !== current.id)
        .map(game => ({
            game,
            score: countShared(game.genres, current.genres) * 2
                + countShared(game.features, current.features),
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score || b.game.rating - a.game.rating)
        .slice(0, limit)
        .map(item => item.game)
}