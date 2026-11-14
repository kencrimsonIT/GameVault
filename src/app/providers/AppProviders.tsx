import type {ReactNode} from 'react'
import {Provider} from 'react-redux'
import {store} from '../../store'

interface AppProvidersProps {
    children: ReactNode
}

const AppProviders = ({children}: AppProvidersProps) => {
    return <Provider store={store}>{children}</Provider>
}

export default AppProviders
