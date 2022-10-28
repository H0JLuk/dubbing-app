import {
    SET_SESSION_HASH, SEND_VOICE_URL, DETERMINATE_SESSION, SET_SESSION_STATUS,
    SET_SESSION, SET_SESSION_DATA, SET_BLOB, SET_VOICE, WRONG_SESSION,
    SET_DEFAULT_SOCKET, SET_SCENE_AWAITING, TRY_TO_CHANGE_SPEAKER, SET_CHANGE_REQUEST
} from '../actions/actionTypes'

const initialState = {
    session: null,
    voice: '',
    status: '',
    data: {
        take_id: null,
        scene_id: null
    },
    blobUrl: '',
    sceneAwaiting: false,
    changeRequest: {}
};

const socket = ( state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_DATA:
            return { ...state, data: action.payload }
        case DETERMINATE_SESSION:
            localStorage.removeItem('session')
            return { ...initialState, status: false}
        case SET_SESSION_HASH:
            return { ...state, session: action.payload }
        case SEND_VOICE_URL:
            return { ...state, voice: action.payload }
        case SET_SESSION_STATUS:
            return { ...state, status: action.payload }
        case SET_SESSION:
            return { ...state, session: action.payload }
        case SET_SCENE_AWAITING:
            return { ...state, sceneAwaiting: action.payload }
        case WRONG_SESSION:
            localStorage.removeItem('session')
            return { ...state, session: 'wrong' }

        case SET_BLOB:
            return { ...state, blobUrl: action.payload}
        case SET_VOICE:
            URL.revokeObjectURL(state.voice);
            return { ...state, voice: action.payload}
        case SET_DEFAULT_SOCKET:
            return { ...initialState }
        case TRY_TO_CHANGE_SPEAKER:
            return { ...state, changeRequest: action.payload }
        case SET_CHANGE_REQUEST:
            return { ...state, changeRequest: action.payload }

        default:
            return { ...state }
    }
}

export default socket;