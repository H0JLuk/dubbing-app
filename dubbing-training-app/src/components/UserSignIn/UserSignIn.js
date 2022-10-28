import styles from './UserSignIn.module.scss'
import { LoginNotification } from '../Notifications'

const UserSignIn = (props) => {
    const {
        formHandler,
        notification,
        loader
    } = props;

    return (
        <section className={styles.loginWrapper}>
            <div className='container'>
                <div className={styles.login}>
                    <form className={styles.form} onSubmit={formHandler}>
                        <h2 className={styles.title}>Sign In</h2>

                        <div className={styles.inputWrapper}>
                            <label 
                                className={styles.label} 
                                htmlFor="login-input"
                            >
                                Login
                            </label>

                            <input
                                className={styles.input}
                                id='login-input'
                                type="text"
                            />
                        </div>

                        <div className={styles.inputWrapper}>
                            <label 
                                className={styles.label} 
                                htmlFor="password-input"
                            >
                                Password
                            </label>
                            
                            <input
                                className={styles.input}
                                id='password-input'
                                type="password"
                            />
                        </div>

                        <button 
                            className={styles.submit}
                            disabled={loader}
                        >
                            Enter
                        </button>
                    </form>

                    <LoginNotification 
                        notification={notification}
                        style={styles.notification}
                    />
                </div>
            </div>
        </section>
    )
}

export default UserSignIn