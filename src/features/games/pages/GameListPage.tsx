import {useGetGamesQuery} from "../api/gameApi.ts";
import GameCard from "../components/GameCard.tsx";
import {useAppSelector} from "../../../store/hooks.ts";

export default function GameListPage() {
    const {
        data: games = [],
        isLoading,
        error,
    } = useGetGamesQuery();
    const wishlistCount = useAppSelector(state => state.wishlist.ids.length)

    if (isLoading) {
        return <p>Dang tai game...</p>
    }

    if (error) {
        return <p>Khong tai duoc game.</p>
    }

    return (
        <main>
            <h1>Kham pha tro choi</h1>
            <p>Co {games.length} game</p>
            <p>Yeu thich: {wishlistCount}</p>
            {games.map(game => (
                <GameCard key={game.id} game={game}/>
            ))}
        </main>
    )
}