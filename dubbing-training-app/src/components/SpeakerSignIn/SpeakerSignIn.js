import styles from './SpeakerSignIn.module.scss'
import Loader from '../Loader'

const SpeakerSignIn = (props) => {
    const {
        message,
        modalVision,
        component,
        signinHandler,
        emailHandler,
        pinHandler,
        passwordHandler,
        resentHandler,
        cancelHandler
    } = props;

    const setComponent = () => {
        switch(component) {
            case 'loader':
                return <Load
                />;
            case 'email':
                return <Email
                    submitHandler={emailHandler}
                />;
            case 'pin':
                return <Pin
                    submitHandler={pinHandler}
                    resentHandler={resentHandler}
                    message={message}
                />;
            case 'pass':
                return <Pass
                    submitHandler={passwordHandler}
                    resentHandler={resentHandler}
                    message={message}
                />;
            default:
                return <Load
                />;
        }
    }

    return (
        <>
            <button
                className={styles.sign}
                onClick={signinHandler}
            >
                Login
            </button>

            { modalVision && (
                <div
                    className={styles.wrapper}
                >
                    <div className={styles.modal}>
                        { setComponent() }
                    </div>

                    <div
                        className={styles.overlay}
                        onClick={cancelHandler}
                    />
                </div>
            )}
        </>
    )
}

const Load = ({ message }) => {
    return (
        <div className={styles.loader}>
            <Loader />

            { message && (
                <p className={styles.loaderMessage}>{ message }</p>
            )}
        </div>
    )
}

const Email = ({ submitHandler }) => {
    return (
        <form
            className={styles.form}
            onSubmit={submitHandler}
        >
            <div className={styles.inputWrapper}>
                <label
                    htmlFor="speaker-signin-email"
                    className={styles.label}
                >
                    Email
                </label>

                <input
                    id='speaker-signin-email'
                    type="email"
                    className={styles.input}
                />
            </div>

            <button
                className={styles.submit}
            >
                Accept
            </button>
        </form>
    )
}

const Pin = ({ submitHandler, resentHandler, message }) => {
    return (
        <form
            className={styles.form}
            onSubmit={submitHandler}
        >
            <div className={styles.inputWrapper}>
                <label
                    htmlFor='speaker-signin-pin'
                    className={styles.label}
                >
                    Insert pin from email
                </label>

                <input
                    id='speaker-signin-pin'
                    type='text'
                    minLength={6}
                    maxLength={6}
                    className={styles.pin}
                />
            </div>

            { message && (
                <p className={styles.message}>{message}</p>
            )}

            <button
                className={styles.resent}
                onClick={resentHandler}
                type='button'
            >
                Change email
            </button>

            <button
                className={styles.submit}
            >
                Login
            </button>
        </form>
    )
}

const Pass = ({ submitHandler, resentHandler, message }) => {
    return (
        <form
            className={styles.form}
            onSubmit={submitHandler}
        >
            <div className={styles.inputWrapper}>
                <label
                    htmlFor='speaker-signin-password'
                    className={styles.label}
                >
                    Insert your password
                </label>

                <input
                    id='speaker-signin-password'
                    type="password"
                    className={styles.pin}
                />
            </div>

            { message && (
                <p className={styles.message}>{message}</p>
            )}

            <button
                type='button'
                className={styles.resent}
                onClick={resentHandler}
            >
                Change email
            </button>

            <button
                className={styles.submit}
            >
                Login
            </button>
        </form>
    )
}

export default SpeakerSignIn;