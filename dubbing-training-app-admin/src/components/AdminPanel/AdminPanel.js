import styles from './AdminPanel.module.scss'
import Scenes from '../Scenes'
import SceneInfo from '../SceneInfo'
import TakesInfo from '../TakesInfo'
import Logout from '../Logout'
import Users from '../Users'
import UserInfo from '../UserInfo'
import Modal from '../Modal'

const AdminPanel = (props) => {
    const {
        scenes,
        activeScene,
        addScene,
        addUser,
        isSceneChanged,
        setSceneChange,
        saveSceneHandler,
        saveUserHandler,
        deleteHandler,
        isUsersVisible,
        isScenesVisible,
        scenesHandler,
        usersHandler,
        activeUser,
        setUserValid
    } = props;

    return (
        <div className={styles.admin}>
            <Modal />

            <div className='container'>
                { isScenesVisible && (
                    <form className={styles.wrapper} onSubmit={saveSceneHandler}>
                        <Scenes
                            scenesList={scenes}
                            addHandler={addScene}
                            isSceneChanged={isSceneChanged}
                        />

                        <div className={styles.container}>
                            <div className={styles.controls}>
                                <button
                                    className={styles.item + ' ' + (isScenesVisible && styles.active)}
                                    onClick={scenesHandler}
                                    type='button'
                                >
                                    Scenes
                                </button>

                                <button
                                    className={styles.item + ' ' + (isUsersVisible && styles.active)}
                                    onClick={usersHandler}
                                    type='button'
                                >
                                    Users
                                </button>

                                <Logout />
                            </div>

                            <div className={styles.content}>
                                {
                                    activeScene && Object.keys(activeScene).length !== 0 ?
                                        (<>
                                            <SceneInfo
                                                deleteHandler={deleteHandler}
                                                setSceneChange={setSceneChange}
                                            />
                                            <TakesInfo />
                                        </>): null
                                }
                            </div>
                        </div>
                    </form>
                )}

                { isUsersVisible && (
                    <form className={styles.wrapper} onSubmit={saveUserHandler}>
                        <Users
                            addHandler={addUser}
                        />

                        <div className={styles.container}>
                            <div className={styles.controls}>
                                <button
                                    className={styles.item + ' ' + (isScenesVisible && styles.active)}
                                    type="button"
                                    onClick={scenesHandler}
                                >
                                    Scenes
                                </button>

                                <button
                                    className={styles.item + ' ' + (isUsersVisible && styles.active)}
                                    type="button"
                                    onClick={usersHandler}
                                >
                                    Users
                                </button>

                                <Logout />
                            </div>

                            <div className={styles.content}>
                                {
                                    activeUser && (
                                        <UserInfo
                                            setUserValid={setUserValid}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default AdminPanel;