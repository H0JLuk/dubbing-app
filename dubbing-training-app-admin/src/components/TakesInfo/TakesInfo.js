import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import { addTake, updateTake, removeTake } from '../../store/actions/scenes'
import Loader from '../Loader'
import styles from './TakesInfo.module.scss'
import { uploadVideo } from '../../api/takes'
import VideoPreview from '../VideoPreview'

const TakesInfo = () => {
    const dispatch = useDispatch();
    const [ videoLoader, setVideoLoader ] = useState(false);
    const [videoProperties, setVideoProperties] = useState({vision: false, src: ''});
    const changedScene = useSelector(state => state.scenes.changedScene);
    const allTakes = useSelector(state => state.scenes.takes);
    const allScenes = useSelector(state => state.scenes.allScenes);
    const activeScene = useSelector(state => state.scenes.activeScene);

    const addHandler = () => {
        dispatch(addTake());
    }

    const changeHandler = (e, type, id) => {
        const changedTake = {
            id,
            [type]: e.target.value
        }
        dispatch(updateTake(changedTake, allTakes))
    }

    const loadHandler = async (e, id) => {
        const formData = new FormData();
        const fileName = `take-${id}.mp4`;
        const file = new File([e.target.files[0]], `${fileName}`);
        formData.append('file', file);
        setVideoLoader(true);

        const res = await uploadVideo(formData);
        const changedTake = {
            id,
            take_url: `${process.env.REACT_APP_SERVER_URL}/file/${res}`,
            video_name: e.target.files[0].name
        }
        setVideoLoader(false);
        dispatch(updateTake(changedTake, allTakes))
    }

    const deleteHandler = (id) => {
        let isReady = window.confirm('Delete?');
        isReady && dispatch(removeTake(id, activeScene, allTakes, allScenes ))
    }

    const viewHandler = (src) => {
        if (src !== '') {
            setVideoProperties({ vision: true, src });
        }
    }

    const isViewDisabled = (id) => {
        const currentTake = changedScene.takes.find(take => take.id === id);

        if (currentTake.take_url === '') return true
        return false
    }

    const generateTakes = (scene) => {
        const takes = scene.takes ? scene.takes : [];

        return takes.map(take => {
            return (
                <li key={take.id} className={styles.item}>
                    <div className={styles.form}>
                        <div className={styles.takesControls}>
                            <button
                                type='button'
                                className={styles.view}
                                onClick={() => viewHandler(take.take_url)}
                                disabled={videoLoader || isViewDisabled(take.id)}
                            >
                                View
                            </button>

                            <div className={styles.videoContainer}>
                                <label htmlFor={"video-" + take.id} className={styles.videoLabel}>Upload</label>
                                <input
                                    id={"video-" + take.id}
                                    type="file" accept='video/mp4'
                                    className={styles.video}
                                    onChange={e => loadHandler(e, take.id)}
                                    disabled={videoLoader}
                                />
                            </div>

                            <button className={styles.remove} type='button' onClick={() => deleteHandler(take.id)} />
                        </div>

                        <div className={styles.wrap}>
                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`take-title-${take.id}`} className={styles.label}>Title</label>
                                <input
                                    id={`take-title-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputTitle}
                                    defaultValue={take.title}
                                    onChange={e => changeHandler(e, 'title', take.id)}
                                    disabled={videoLoader}
                                    maxLength='20'
                                />
                            </div>

                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`take-video-${take.id}`} className={styles.label}>Video</label>
                                <input
                                    id={`take-video-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputVideo}
                                    value={take.video_name}
                                    onChange={e => changeHandler(e, 'video_name', take.id)}
                                    maxLength='20'
                                    disabled
                                />
                            </div>
                        </div>

                        <div className={styles.wrap}>
                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`take-pre-headline-${take.id}`} className={styles.label}>Pre-take headline</label>
                                <input
                                    id={`take-pre-headline-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputPreTitle}
                                    defaultValue={take.pre_take_headline}
                                    onChange={e => changeHandler(e, 'pre_take_headline', take.id)}
                                    disabled={videoLoader}
                                    maxLength='20'
                                    required
                                />
                            </div>

                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`take-pre-text-${take.id}`} className={styles.label}>Pre-take text</label>
                                <TextareaAutosize
                                    id={`take-pre-text-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputPreText}
                                    defaultValue={take.pre_take_text}
                                    onChange={e => changeHandler(e, 'pre_take_text', take.id)}
                                    disabled={videoLoader}
                                    maxLength='340'
                                    maxRows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.wrap}>
                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`take-headline-${take.id}`} className={styles.label}>Take headline</label>
                                <input
                                    id={`take-headline-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputPreTitle}
                                    defaultValue={take.take_headline}
                                    onChange={e => changeHandler(e, 'take_headline', take.id)}
                                    disabled={videoLoader}
                                    maxLength='20'
                                    required
                                />
                            </div>

                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`take-text-${take.id}`} className={styles.label}>Take text</label>
                                <TextareaAutosize
                                    id={`take-text-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputPreText}
                                    defaultValue={take.take_text}
                                    onChange={e => changeHandler(e, 'take_text', take.id)}
                                    disabled={videoLoader}
                                    maxLength='340'
                                    maxRows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.wrap}>
                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`post-take-headline-${take.id}`} className={styles.label}>Post-take headline</label>
                                <input
                                    id={`post-take-headline-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputPreTitle}
                                    defaultValue={take.post_take_headline}
                                    onChange={e => changeHandler(e, 'post_take_headline', take.id)}
                                    disabled={videoLoader}
                                    maxLength='20'
                                    required
                                />
                            </div>

                            <div className={styles.container + ' ' + styles.sub}>
                                <label htmlFor={`post-take-text-${take.id}`} className={styles.label}>Post-take text</label>
                                <TextareaAutosize
                                    id={`post-take-text-${take.id}`}
                                    type="text"
                                    className={styles.input + ' ' + styles.inputPreText}
                                    defaultValue={take.post_take_text}
                                    onChange={e => changeHandler(e, 'post_take_text', take.id)}
                                    disabled={videoLoader}
                                    maxLength='340'
                                    maxRows={4}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
    }

    return (
        <>
            <div className={styles.takes}>
                <button type='button' className={styles.button} onClick={addHandler}>Add new take</button>

                {
                    (changedScene.takes && changedScene.takes.length !== 0) && (
                        <div className={styles.takesWrapper}>
                            <ul className={styles.list}>
                                { generateTakes(changedScene) }
                            </ul>

                            {
                                videoLoader && (
                                    <div className={styles.loader}>
                                        <Loader />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>

            <VideoPreview
                videoProperties={videoProperties}
                setVideoProperties={setVideoProperties}
            />
        </>
    )
}

export default TakesInfo;