import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styles from './Logout.module.scss'
import { useAuth } from '../../api/Auth'
import { stopSession, setDefaultSocket } from '../../store/actions/socket'
import { setDefaultProfile } from '../../store/actions/profile'
import { setDefaultScenes } from '../../store/actions/scenes'

const Logout = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const { session, data } = useSelector(state => state.socket);

    const logoutHandler = () => {
        removeSession();
        removeProfile();
        removeScenes();
        removeLocalData();
        history.push('/login');
    }

    const removeLocalData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('session');
    }

    const removeSession = () => {
        if (
            session !== 'null' &&
            Object.keys(auth.user).length !== 0 &&
            data.host_id === auth.user.id
        ) {
            dispatch(stopSession(session, auth.user.username));
        }

        dispatch(setDefaultSocket());
    }

    const removeProfile = () => {
        dispatch(setDefaultProfile());
    }

    const removeScenes = () => {
        dispatch(setDefaultScenes());
    }

    return (
        <div>
            <button
                className={styles.button}
                onClick={logoutHandler}
                type='button'
            >
                {
                    Object.keys(auth.user).length > 0
                        ? 'Logout'
                        : 'Leave session'
                }
            </button>
        </div>
    )
}

export default Logout;