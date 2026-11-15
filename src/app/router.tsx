import {createBrowserRouter} from 'react-router-dom'
import ForbiddenPage from '../pages/ForbiddenPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
