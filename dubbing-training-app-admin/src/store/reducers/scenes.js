import {
    SET_SCENES, SET_ACTIVE_SCENE, SET_GROUPS,
    SET_CHANGED_SCENE, ADD_NEW_SCENE, ADD_TAKE,
    SET_TAKES, CLEAR_SCENES
} from '../actions/actionTypes'

const initialState = {
    allScenes: [],
    allGroups: [],
    activeScene: {},
    changedScene: {},
    takes: []
}

const scenes = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCENES:
            return { ...state, allScenes: action.payload }
        case SET_ACTIVE_SCENE:
            return { ...state, activeScene: action.payload }
        case SET_GROUPS:
            return { ...state, allGroups: action.payload }
        case SET_CHANGED_SCENE:
            return { ...state, changedScene: action.payload  }
        case ADD_NEW_SCENE:
            return { ...state, allScenes: [ ...state.allScenes, action.payload ]}
        case ADD_TAKE:
            return { ...state, takes: [ ...state.takes, action.payload ]}
        case SET_TAKES:
            return { ...state, takes: action.payload }
        case CLEAR_SCENES:
            return { ...state, allScenes: [], allGroups: [], activeScene: {}, changedScene: {}, takes: []}
        default:
            return { ...state }
    }
}

export default scenes;