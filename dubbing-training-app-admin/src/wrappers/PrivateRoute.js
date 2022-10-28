import { Route } from 'react-router-dom'
import { useAuth } from '../api/Auth'

import LoadPage from '../wrappers/LoadPage'

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();

    return (
        <Route
            {...rest}

            render={() => {
                return (
                    <LoadPage promise={auth.checkToken} location='/login'>
                        { children }
                    </LoadPage>
                )
            }}
        />
    );
}

export default PrivateRoute;