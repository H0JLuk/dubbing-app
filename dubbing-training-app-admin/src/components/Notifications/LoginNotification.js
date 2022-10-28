import styles from './Notification.module.scss'

const LoginNotification = (props) => {
    const {
        notification,
        style
    } = props;

    return notification ? (
        <div 
            className={styles.LoginNotification + ' ' + style} 
            style={{ backgroundColor: notification.color }}
        >
            <h4 className={styles.LoginTitle}>{notification.title}</h4>

            <p className={styles.LoginText}>{notification.text}</p>
        </div>
    ) : null
}

export default LoginNotification;