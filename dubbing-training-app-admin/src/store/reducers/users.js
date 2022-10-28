import { SET_USERS_LIST, SET_ACTIVE_USER, SET_CHANGED_USER, ADD_NEW_USER } from '../actions/actionTypes'

const initialState = {
    users: [],
    activeUser: null,
    changedUser: {}
}

const users = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS_LIST:
            return { ...state, users: action.payload }
        case SET_ACTIVE_USER:
            return { ...state, activeUser: action.payload }
        case SET_CHANGED_USER:
            return { ...state, changedUser: action.payload }
        case ADD_NEW_USER:
            return { ...state, users: [ ...state.users, action.payload ] }
        default:
            return { ...state}
    }
}

export default users;