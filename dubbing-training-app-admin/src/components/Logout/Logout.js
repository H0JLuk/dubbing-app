import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './Logout.module.scss'
import { clearUser } from '../../store/actions/profile'
import { clearScenes } from '../../store/actions/scenes'

const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(clearScenes());
        dispatch(clearUser());
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div className={styles.logout}>
            <button type='button' onClick={logoutHandler} className={styles.button}>Logout</button>
        </div>
    )
}

export default Logout;