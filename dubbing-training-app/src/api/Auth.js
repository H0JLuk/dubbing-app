import { createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRollbar } from '@rollbar/react';

import { connectToSession, setSessionStatus, setSession } from '../store/actions/socket'
import { setUser } from '../store/actions/profile'
import { signInUser, checkUserToken } from './users'

const authContext = createContext();

const useProvideAuth = () => {
    const dispatch = useDispatch();
    const rollbar = useRollbar();
    const user = useSelector(state => state.profile.user);

    const signin = async (username, password, success, error) => {
        const data = { username, password };

        try {
            const res = await signInUser(data);
            localStorage.setItem('token', res.access_token);
            dispatch(setUser(res));

            success(res);
        } catch(err) {
            error(err);
        }
    };

    const checkToken = async () => {
        const localToken = localStorage.getItem('token');
        if (!localToken) { return }

        try {
            const { session, ...data } = await checkUserToken(localToken);
            if (session) {
                localStorage.setItem('session', session);
            }

            dispatch(setUser(data));
            return true;
        } catch (err) {
            return false;
        }
    };

    const getLocalToken = () => {
        return localStorage.getItem('token');
    };

    const checkSession = async (hash = 'qwe') => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/session', { params: {session: hash} });
            return data;
        } catch (err) {
            rollbar.error('WRONG SESSION: ', err);
            return false;
        }
    };

    const connectSession = (hash) => {
        dispatch(connectToSession(hash));
        dispatch(setSession(hash));
        dispatch(setSessionStatus(true));
    };

    const sendPin = async (email, min) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/send-pin', { email, min });
            return data;
        } catch (err) {
            rollbar.error('PIN SENDING PROBLEM: ', err);
        }
    }

    const removePin = async (email) => {
        try {
            const localToken = localStorage.getItem('token');
            const {data} = await axios.post(process.env.REACT_APP_SERVER_URL + '/remove-pin', { data: email }, {headers: { Authorization: 'Bearer ' + localToken }});
            return data
        } catch (err) {
            rollbar.error('PIN REMOVING PROBLEM: ', err);
        }
    }

    return {
        user,
        signin,
        getLocalToken,
        checkToken,
        checkSession,
        connectSession,
        sendPin,
        removePin
    };
}

export const useAuth = () => {
    return useContext(authContext);
};

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}