import { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../store/actions/profile'
import { signInAdmin, checkAdminToken } from '../api/users'

const authContext = createContext();

const useProvideAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);

    const signin = async (username, password, success = () => {}, error = () => {}) => {
        const data = { username, password };

        try {
            const resData = await signInAdmin(data);
            if (!resData) throw new Error('Auth error')

            const token = resData.access_token;
            localStorage.setItem('token', token);
            dispatch(setUser(resData));

            success(resData);
        } catch(err) {
            error(err);
        }
    };

    const checkToken = async () => {
        const localToken = localStorage.getItem('token');

        try {
            const data = await checkAdminToken(localToken)
            dispatch(setUser(data));
            return true;
        } catch (err) {
            return false;
        }
    };

    const getLocalToken = () => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line
    }, []);

    return {
        user,
        signin,
        getLocalToken,
        checkToken
    };
}

export const useAuth = () => {
    return useContext(authContext);
};

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}