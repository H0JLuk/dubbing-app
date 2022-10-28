import { readAllScenes } from '../../api/scenes'
import { SET_ACTIVE_SCENE, SET_SCENES, SET_DEFAULT_SCENES } from './actionTypes'

const getScenes = (id) => {
    return async dispatch => {
        const data = await readAllScenes(id);
        if (data) {
            dispatch(setScenes(data))
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

const setDefaultScenes = () => {
    return {
        type: SET_DEFAULT_SCENES
    }
}

export {
    getScenes,
    setScenes,
    setActiveScene,
    setDefaultScenes
}