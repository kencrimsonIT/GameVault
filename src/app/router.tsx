import {createBrowserRouter} from 'react-router-dom'
import ForbiddenPage from '../pages/ForbiddenPage'
import NotFoundPage from '../pages/NotFoundPage'
import GameListPage from '../features/games/pages/GameListPage'
export const router = createBrowserRouter([
  {
    path: '/games',
    element: <GameListPage />,
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
