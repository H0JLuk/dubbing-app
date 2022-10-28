import styles from './Users.module.scss'

const Users = (props) => {
    const {
        usersList,
        chooseUser,
        checkActive,
        addHandler
    } = props;

    const renderList = () => {
        return usersList.map(user => (
            <li key={user.id} className={styles.user}>
                <button
                    className={styles.button}
                    onClick={() => chooseUser(user)}
                    type='button'
                    style={checkActive(user.id)}
                >
                    {user.username}
                </button>
            </li>
        ))
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.project}>Dubtrain</h1>

            <div className={styles.container}>
                <button className={styles.add} onClick={addHandler} type='button'>Add user</button>
            </div>

            <ul className={styles.list}>
                { renderList() }
            </ul>
        </div>
    )
}

export default Users;