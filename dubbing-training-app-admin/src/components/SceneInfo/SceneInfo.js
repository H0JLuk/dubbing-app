import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from "react-select";

import { setChangedScene, setTakes } from '../../store/actions/scenes'
import './selectBar.scss'
import styles from './SceneInfo.module.scss'
import deepEqual from '../../utils/deepEqual'

const SceneInfo = (props) => {
    const {
        deleteHandler = () => {},
        setSceneChange
    } = props;

    const dispatch = useDispatch();
    const [gender, setGender] = useState();
    const [groups, setGroups] = useState();
    const activeScene = useSelector(state => state.scenes.activeScene);
    const allGroups = useSelector(state => state.scenes.allGroups);
    const changedScene = useSelector(state => state.scenes.changedScene);
    const allTakes = useSelector(state => state.scenes.takes);
    const formRef = useRef();
    const titleRef = useRef();
    const roleRef = useRef();
    const genderRef = useRef();
    const ageRef = useRef();
    const groupsRef = useRef();
    const timeRef = useRef();
    const takesRef = useRef();

    useEffect(() => {
        setFormValues(activeScene);
        // eslint-disable-next-line
    }, [activeScene])

    useEffect(() => {
        changeHandler();
        // eslint-disable-next-line
    }, [gender, groups, allTakes])

    const setFormValues = (scene) => {
        titleRef.current.value = scene.title;
        roleRef.current.value = scene.role_name;
        ageRef.current.value = scene.age;
        timeRef.current.value = scene.training_time;
        takesRef.current.value = scene.takes.length;
        groupsRef.current.select.setValue(setGroupsOptions(scene.groups));
        genderRef.current.select.setValue({ value: scene.gender, label: scene.gender});
        dispatch(setTakes(scene.takes));
    }

    const setGroupsOptions = (groups) => {
        return groups.map(group => ({ value: group.group_name, label: group.group_name }))
    }

    const changeHandler = () => {
        setSceneChange(false);
        const newScene = saveChangedScene();

        const isEqual = deepEqual(newScene, activeScene);
        !isEqual && setSceneChange(true);

        for (let i = 0; i < newScene.takes.length; i++) {
            const currentTake = newScene.takes[i];
            if (!currentTake.title || !currentTake.take_start || !currentTake.take_end || !currentTake.take_url || !currentTake.video_name) {
                return setSceneChange(true);
            }
        }

        const isValid = isFormValid();
        !isValid && setSceneChange(true);
    }

    const isFormValid = () => {
        if (titleRef.current.value.trim() === '') return false
        if (roleRef.current.value.trim() === '') return false
        if (ageRef.current.value.trim() === '') return false
        if (timeRef.current.value.trim() === '') return false
        if (takesRef.current.value.trim() === '') return false
        if (gender && gender.value === '') return false
        if (groups && groups.length === 0) return false
        if (changedScene.takes && changedScene.takes.length === 0) return false
        return true
    }

    const revertGroups = (groups) => {
        return groups.map(group => allGroups.find(element => element.group_name === group.value))
    }

    const saveChangedScene = () => {
        const scene = {
            title: titleRef.current.value,
            role_name: roleRef.current.value,
            age: parseInt(ageRef.current.value, 10),
            training_time: timeRef.current.value,
            gender: genderRef.current.state.value.value,
            groups: revertGroups(groupsRef.current.state.value),
            takes: [ ...allTakes ]
        };

        if (activeScene.id) {
            scene.id = activeScene.id;
        }

        dispatch(setChangedScene(scene))

        return scene;
    }

    return (
        <div className={styles.sceneInfo}>
            <div ref={formRef} onChange={changeHandler}>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={() => deleteHandler(activeScene)} type='button'>Delete scene</button>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.field}>
                        <label htmlFor="scene-title" className={styles.label}>Scene title</label>
                        <input
                            id='scene-title'
                            name='title'
                            type="text"
                            className={styles.input + ' ' + styles.title}
                            defaultValue={activeScene.title}
                            ref={titleRef}
                            maxLength='20'
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="scene-role" className={styles.label}>Role name</label>
                        <input
                            id='scene-role'
                            name='role'
                            type="text"
                            className={styles.input + ' ' + styles.role}
                            defaultValue={activeScene.role_name}
                            ref={roleRef}
                            maxLength='20'
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.field}>
                            <label htmlFor="scene-gender" className={styles.label}>Gender</label>

                            <Select
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'Other', label: 'Other' }
                                ]}
                                name='Gender'
                                classNamePrefix='select'
                                ref={genderRef}
                                defaultValue={{ value: activeScene.gender, label: activeScene.gender }}
                                onChange={value => {
                                    setGender(value);
                                    changeHandler();
                                }}
                                value={gender}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="scene-age" className={styles.label}>Age</label>
                            <input
                                id='scene-age'
                                name='age' type="number"
                                className={styles.input + ' ' + styles.age}
                                defaultValue={activeScene.age}
                                ref={ageRef}
                                onChange={changeHandler}
                                required
                                maxLength='5'
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="scene-groups" className={styles.label}>Visible for groups</label>

                        <Select
                            options={setGroupsOptions(allGroups)}
                            isMulti
                            name='Groups'
                            classNamePrefix='select'
                            ref={groupsRef}
                            defaultValue={setGroupsOptions(activeScene.groups)}
                            onChange={value => {
                                setGroups(value);
                                changeHandler();
                            }}
                            value={groups}
                            required
                        />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.field}>
                            <label htmlFor="scene-time" className={styles.label}>Time</label>
                            <input
                                id='scene-time'
                                type="time"
                                className={styles.input + ' ' + styles.time}
                                defaultValue={activeScene.training_time}
                                ref={timeRef}
                                step='0.001'
                                onChange={changeHandler}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="scene-takes" className={styles.label}>Takes</label>
                            <input
                                id='scene-takes'
                                type="number"
                                className={styles.input + ' ' + styles.takes}
                                disabled
                                value={changedScene.takes ? changedScene.takes.length : activeScene.takes.length}
                                ref={takesRef}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SceneInfo;