import { useDispatch, useSelector } from 'react-redux';

import styles from './Scenes.module.scss';
import { setActiveScene } from '../../store/actions/scenes'
import deepEqual from '../../utils/deepEqual'
import { deleteTempTakes } from '../../api/scenes'

const Scenes = (props) => {
    const {
        addHandler = () => {},
        scenesList = []
    } = props;

    const dispatch = useDispatch();
    const scenes = useSelector(state => state.scenes);
    const settings = useSelector(state => state.settings);

    const checkActive = (id) => {
        if (scenes.activeScene && scenes.activeScene.id === id) {
            return { backgroundColor: '#7B7676' }
        }
    }

    const renderList = () => {
        return scenesList.map(scene => (
            <li key={scene.id} className={styles.scene}>
                <button
                    className={styles.button}
                    onClick={() => chooseScene(scene)}
                    type='button'
                    style={checkActive(scene.id)}
                >
                    {scene.title}
                </button>
            </li>
        ))
    }

    const chooseScene = (scene) => {
        let isReady = true;

        if (scenes.activeScene && Object.keys(scenes.activeScene).length !== 0) {
            const isEqual = deepEqual(scenes.activeScene, scenes.changedScene);
            isReady = !isEqual ? window.confirm('Discard all changes?') : true;
        }

        isReady && deleteTempTakes(scenes.takes);
        isReady && dispatch(setActiveScene(scene));
    }

    const isSaveDisabled = () => {
        return deepEqual(scenes.activeScene, scenes.changedScene) || settings.loader;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.project}>Dubtrain</h1>

            <div className={styles.container}>
                {
                    scenes.activeScene && Object.keys(scenes.activeScene).length !== 0 ?
                        (<button
                            type='submit'
                            className={styles.save}
                            disabled={isSaveDisabled()}
                        >
                            Save changes
                        </button>):null
                }
                <button className={styles.add} onClick={addHandler} type='button'>Add scene</button>
            </div>

            <ul className={styles.list}>
                { renderList() }
            </ul>
        </div>
    )
}

export default Scenes;