import { Route, useLocation } from 'react-router-dom'
import { useAuth } from '../api/Auth'

import LoadPage from '../wrappers/LoadPage'

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    const location = useLocation();

    return (
        <Route
            {...rest}

            render={() => {
                const routes = location.pathname.split('/');
                if (routes[1] === 'session') {
                    return (
                        <LoadPage promise={() => auth.checkSession(routes[2])} location='/login'>
                            { children }
                        </LoadPage>
                    )
                } else {
                    return (
                        <LoadPage promise={auth.checkToken} location='/login'>
                            { children }
                        </LoadPage>
                    )
                }
            }}
        />
    );
}

export default PrivateRoute;