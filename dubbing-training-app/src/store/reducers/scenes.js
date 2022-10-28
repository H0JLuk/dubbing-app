import { SET_ACTIVE_SCENE, SET_SCENES, SET_DEFAULT_SCENES } from '../actions/actionTypes'

const initialState = {
    allScenes: [],
    activeScene: {}
}

const scenes = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_SCENES:
            return { ...state, allScenes: action.payload }
        case SET_ACTIVE_SCENE:
            return { ...state, activeScene: action.payload }
        case SET_DEFAULT_SCENES:
            return { ...initialState }
        default:
            return { ...state }
    }
}

export default scenes