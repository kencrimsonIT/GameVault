import {createBrowserRouter} from 'react-router-dom'
import ForbiddenPage from '../pages/ForbiddenPage'

export const router = createBrowserRouter([
    {
        path: '/403',
        element: <ForbiddenPage/>,
    },
])
