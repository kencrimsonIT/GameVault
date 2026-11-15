import {createBrowserRouter} from 'react-router-dom'
import ForbiddenPage from '../pages/ForbiddenPage'
import NotFoundPage from '../pages/NotFoundPage'
import GameListPage from '../features/games/pages/GameListPage'
import GameDetailPage from '../features/games/pages/GameDetailPage'

export const router = createBrowserRouter([
    {
        path: '/games',
        element: <GameListPage/>,
    },
    {
        path: '/games/:id',
        element: <GameDetailPage/>,
    },
    {
        path: '/403',
        element: <ForbiddenPage/>,
    },
    {
        path: '*',
        element: <NotFoundPage/>,
    },
])
