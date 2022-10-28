import { useDispatch, useSelector } from 'react-redux'

import styles from './Modal.module.scss'
import Loader from '../Loader'
import { setError, setSuccess } from '../../store/actions/settings'

const Modal = () => {
    const { error, success, loader } = useSelector(state => state.settings);
    const dispatch = useDispatch();

    const errorHandler = () => {
        dispatch(setError(null));
    }

    const successHandler = () => {
        dispatch(setSuccess(null));
    }

    return (
        <>
            { loader && (
                <div className={styles.overlay}>
                    <div className={styles.wrapper}>
                        <div className={styles.loader}>
                            <Loader />
                        </div>

                        <p className={styles.text}>Saving changes...</p>
                    </div>
                </div>
            )}
            { error && (
                <div className={styles.overlay}>
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>{error.title}</h2>

                        <p className={styles.text}>{error.text}</p>

                        <button className={styles.button}  type="button" onClick={errorHandler}>Proceed</button>
                    </div>
                </div>
            )}
            { success && (
                <div className={styles.overlay}>
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>{success.title}</h2>

                        <button className={styles.button} type="button" onClick={successHandler}>Proceed</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;