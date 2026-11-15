import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useAppSelector} from '../../../store/hooks'
import {selectIsAuthenticated} from '../slices/authSlice'

const RequireAuth = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const location = useLocation()

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/auth"
                replace
                state={{from: `${location.pathname}${location.search}`}}
            />
        )
    }

    return <Outlet/>
}

export default RequireAuth
