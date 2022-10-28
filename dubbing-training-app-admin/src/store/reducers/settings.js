import { SET_USERS_INTERFACE, SET_SCENES_INTERFACE, SET_LOADER, SET_ERROR, SET_SUCCESS } from '../actions/actionTypes'

const initialState = {
    isUsersVisible: false,
    isScenesVisible: true,

    error: null, // title, text
    success: null, // title
    loader: false
}

const settings = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_INTERFACE:
            return { ...state, isUsersVisible: true, isScenesVisible: false }
        case SET_SCENES_INTERFACE:
            return { ...state, isUsersVisible: false, isScenesVisible: true }
        case SET_LOADER:
            return { ...state, loader: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        case SET_SUCCESS:
            return { ...state, success: action.payload }
        default:
            return { ...state}
    }
}

export default settings;