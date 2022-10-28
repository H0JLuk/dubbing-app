import { SET_USER, CLEAR_USER } from "./actionTypes";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}

export {
    setUser,
    clearUser
}