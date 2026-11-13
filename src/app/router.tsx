import {createBrowserRouter} from 'react-router-dom'
import AuthPage from '../features/auth/pages/AuthPage'
import RequireAuth from '../features/auth/components/RequireAuth'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import ForbiddenPage from '../pages/ForbiddenPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/admin',
        element: <ForbiddenPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
