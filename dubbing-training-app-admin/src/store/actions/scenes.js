import {
    SET_SCENES, SET_ACTIVE_SCENE, SET_GROUPS,
    SET_CHANGED_SCENE, ADD_NEW_SCENE, ADD_TAKE,
    SET_TAKES, CLEAR_SCENES
} from './actionTypes'
import { setLoader, setError, setSuccess } from './settings'
import { getAllGroups } from '../../api/groups'
import { createScene, updateScene, deleteScene, readAllScenes } from '../../api/scenes'
import { deleteTake } from '../../api/takes'
import { v4 } from 'uuid'

const getAllScenes = () => {
    return async dispatch => {
        const data = await readAllScenes();
        if (data) {
            dispatch(setScenes(data));
        }
    }
}

const setScenes = (scenes) => {
    return {
        type: SET_SCENES,
        payload: scenes
    }
}

const setActiveScene = (scene) => {
    return {
        type: SET_ACTIVE_SCENE,
        payload: scene
    }
}

const setNewScene = () => {
    const newScene = {
        title: '',
        role_name: '',
        gender: '',
        age: '',
        training_time: '',
        groups: [],
        takes: []
    }

    return {
        type: SET_ACTIVE_SCENE,
        payload: newScene
    }
}

const getGroups = () => {
    return async dispatch => {
        const data = await getAllGroups();
        dispatch(setGroups(data))
    }
}

const setGroups = (data) => {
    return {
        type: SET_GROUPS,
        payload: data
    }
}

const saveScene = (scene) => {
    return async dispatch => {
        let changedScene = scene;
        let res;
        dispatch(setLoader(true));

        if (changedScene.id) {
            res = await updateScene(changedScene);
        } else {
            res = await createScene(changedScene);
        }

        if (res && res.status) {
            if (changedScene.id) {
                dispatch(getAllScenes());
            } else {
                dispatch(addNewScene(res.data));
            }

            dispatch(setActiveScene(res.data));
            dispatch(setSuccess({ title: 'All done!' }));
        } else if (res && !res.status) {
            let message = 'Some takes has problems:';

            res.invalid.forEach(take => {
                message += ` ${take.title},`
            })
            dispatch(setTakes(res.data));
            dispatch(setError({
                title: "Scene not saved, please try again",
                text: message.slice(0, message.length - 1)
            }));
        } else {
            dispatch(setError({
                title: "Something goes wrong",
                text: 'Scene not saved, please try again.'
            }));
        }

        dispatch(setLoader(false));
    }
}

const addNewScene = (scene) => {
    return {
        type: ADD_NEW_SCENE,
        payload: scene
    }
}

const setChangedScene = (scene) => {
    return {
        type: SET_CHANGED_SCENE,
        payload: scene
    }
}

const removeScene = (scene, scenes) => {
    return async dispatch => {
        if (scene.id) {
            const data = await deleteScene(scene);

            if (data) {
                const currentIndex = scenes.findIndex(element => element.id === scene.id);
                const newScenes = [ ...scenes.slice(0, currentIndex), ...scenes.slice(currentIndex + 1)];
                dispatch(setScenes(newScenes));
            }
        }

        dispatch(setActiveScene(null))
    }
}

const addTake = () => {
    const newTake = {
        id: 'local-' + v4(),
        title: '',
        take_start: '00:00:00.000',
        take_end: '00:00:00.000',
        pre_take_headline: '',
        pre_take_text: '',
        take_headline: '',
        take_text: '',
        post_take_headline: '',
        post_take_text: '',
        take_url: '',
        video_name: ''
    }

    return {
        type: ADD_TAKE,
        payload: newTake
    }
}

const setTakes = (takes) => {
    return {
        type: SET_TAKES,
        payload: takes
    }
}

const updateTake = (take, takes) => {
    const currentTakeId = takes.findIndex(el => el.id === take.id);
    const changedTake = { ...takes[currentTakeId], ...take };
    const newTakes = [ ...takes.slice(0, currentTakeId), changedTake, ...takes.slice(currentTakeId + 1) ]
    return {
        type: SET_TAKES,
        payload: newTakes
    }
}

const removeTake = (takeId, activeScene, takes, scenes) => {
    return async dispatch => {
        let res = true; 
        const currentTakeId = takes.findIndex(el => el.id === takeId);
        const newTakes = currentTakeId !== -1 ? [ ...takes.slice(0, currentTakeId), ...takes.slice(currentTakeId + 1) ] : takes;

        const currentActiveScene = activeScene.takes.findIndex(el => el.id === takeId);
        const currentActiveTakes = currentActiveScene !== -1 ? [ ...activeScene.takes.slice(0, currentActiveScene), ...activeScene.takes.slice(currentActiveScene + 1) ] : null;
        const newActiveScene = currentActiveTakes && { ...activeScene, takes: currentActiveTakes };

        const currentSceneId = scenes.findIndex(el => el.id === activeScene.id);
        const newScene = newActiveScene ? newActiveScene : activeScene;
        const newScenes = currentSceneId !== -1 ? [ ...scenes.slice(0, currentSceneId), newScene, ...scenes.slice(currentSceneId + 1) ] : scenes;

        res = await deleteTake(takeId);
        res && dispatch(setTakes(newTakes));
        (res && currentActiveTakes) && dispatch(setActiveScene(newActiveScene));
        (res && activeScene.id) && dispatch(setScenes(newScenes));
    }
}

const clearScenes = () => {
    return {
        type: CLEAR_SCENES
    }
}

export {
    getAllScenes,
    setScenes,
    setActiveScene,
    setNewScene,
    getGroups,
    setGroups,
    saveScene,
    setChangedScene,
    addNewScene,
    removeScene,
    addTake,
    setTakes,
    updateTake,
    removeTake,
    clearScenes
}