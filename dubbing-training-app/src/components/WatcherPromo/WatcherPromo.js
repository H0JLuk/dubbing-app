import { useDispatch } from 'react-redux'

import styles from './WatcherPromo.module.scss'
import { setWatcher } from '../../store/actions/profile'

const WatcherPromo = () => {
    const dispatch = useDispatch();

    const connectHandler = () => {
        dispatch(setWatcher());
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.header}>connect to session?</h1>

                <button className={styles.btn} onClick={connectHandler}>connect</button>
            </div>
        </div>
    )
}

export default WatcherPromo;