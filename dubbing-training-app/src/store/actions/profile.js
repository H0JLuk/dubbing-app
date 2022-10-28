import { SET_SPEAKER, SET_WATCHER, SET_WAITER, SET_USER, SET_DEFAULT_PROFILE } from "./actionTypes";

const setWatcher = () => {
    return {
        type: SET_WATCHER
    }
}

const setWaiter = () => {
    return {
        type: SET_WAITER
    }
}

const setSpeaker = () => {
    return {
        type: SET_SPEAKER
    }
}

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const setDefaultProfile = () => {
    return {
        type: SET_DEFAULT_PROFILE
    }
}

export {
    setWatcher,
    setSpeaker,
    setWaiter,
    setUser,
    setDefaultProfile
}