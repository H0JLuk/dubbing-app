import { SET_USERS_INTERFACE, SET_SCENES_INTERFACE, SET_ERROR, SET_LOADER, SET_SUCCESS } from '../actions/actionTypes'

const setUsersInterface = () => {
    return {
        type: SET_USERS_INTERFACE
    }
}

const setScenesInterface = () => {
    return {
        type: SET_SCENES_INTERFACE
    }
}

const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

const setLoader = (status) => {
    return {
        type: SET_LOADER,
        payload: status
    }
}

const setSuccess = (success) => {
    return {
        type: SET_SUCCESS,
        payload: success
    }
}

export {
    setUsersInterface,
    setScenesInterface,
    setError,
    setLoader,
    setSuccess
}