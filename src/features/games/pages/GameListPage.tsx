import {useGetGamesQuery} from "../api/gameApi.ts";
import GameCard from "../components/GameCard.tsx";

export default function GameListPage() {
    const {
        data: games =[],
        isLoading,
        error,
    }= useGetGamesQuery();
    if(isLoading) {
        return (
            <p>Dang tai game...</p>
        )
    }
    if(error) {
        return (
            <p>khong tai duoc game.</p>
        )
    }
        return (
            <main>
                <h1>kham pha tro choi</h1>
                <p>Co {games.length} game</p>
                {games.map(game => (
                    <GameCard key={game.id} game={game}/>
                ))}
            </main>
        )
}