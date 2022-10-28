import { useDispatch, useSelector } from 'react-redux'

import styles from './Scenes.module.scss'
import Logout from '../Logout';
import Session from '../Session'
import { setSessionData } from '../../store/actions/socket'
import { setActiveScene } from '../../store/actions/scenes'

const Scenes = (props) => {
    const {
        scenes
    } = props;

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.socket);

    const renderScenes = (list) => {
        return list.map(scene => {
            return (
                <li key={scene.id} className={styles.item}>
                    <span
                        className={styles.scene}
                        onClick={() => startHandler(scene)}
                    >
                        {scene.title}
                    </span>
                </li>
            )
        })
    }

    const startHandler = (scene) => {
        dispatch(setActiveScene(scene));
        dispatch(setSessionData({
            ...data,
            scene_id: scene.id,
            take_id: scene.takes[0].id
        }));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.project}>Dubtrain</h1>

                <Logout />
            </div>

            <h2 className={styles.header}>Select your scene to train</h2>

            <div className={styles.clipboard}>
                <Session buttonVision={false} />
            </div>

            <ul className={styles.list}>
                { renderScenes(scenes) }
            </ul>
        </div>
    )
}

export default Scenes;