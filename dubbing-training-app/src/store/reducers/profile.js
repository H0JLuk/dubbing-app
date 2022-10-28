import { SET_SPEAKER, SET_WATCHER, SET_WAITER, SET_USER, SET_DEFAULT_PROFILE } from '../actions/actionTypes'

const initialState = {
    status: '',
    user: {}
};

const profile = ( state = initialState, action) => {
    switch (action.type) {
        case SET_SPEAKER:
            return { ...state, status: 'speaker' }
        case SET_WATCHER:
            return { ...state, status: 'watcher' }
        case SET_WAITER:
            return { ...state, status: 'waiter' }
        case SET_USER:
            return { ...state, user: action.payload }
        case SET_DEFAULT_PROFILE:
            return { ...initialState }
        default:
            return { ...state }
    }
}

export default profile;