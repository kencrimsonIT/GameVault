import {createBrowserRouter} from 'react-router-dom'
import AuthPage from '../features/auth/pages/AuthPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import RequireAuth from '../features/auth/components/RequireAuth'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import ForbiddenPage from '../pages/ForbiddenPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import GameListPage from '../features/games/pages/GameListPage'
import GameDetailPage from '../features/games/pages/GameDetailPage'

export const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
        ],
    },
    {
        path: '/games',
        element: <GameListPage/>,
    },
    {
        path: '/games/:id',
        element: <GameDetailPage/>,
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth',
                element: <AuthPage/>,
            },
            {
                path: '/auth/forgot-password',
                element: <ForgotPasswordPage/>,
            },
        ],
    },
    {
        element: <RequireAuth/>,
        children: [
            {
                path: '/admin',
                element: <ForbiddenPage/>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage/>,
    },
])