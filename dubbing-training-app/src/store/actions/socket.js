import { 
    START_SESSION, CONNECT_SESSION, DETERMINATE_SESSION,
    SET_SESSION_STATUS, SET_SESSION, SET_SESSION_DATA, SEND_SESSION_DATA,
    SET_VOICE, SET_DEFAULT_SOCKET, SET_SCENE_AWAITING, CHANGE_SPEAKER,
    SET_CHANGE_REQUEST
} from './actionTypes';

const initSession = (user) => {
    return {
        type: 'SOCKET/' + START_SESSION, 
        payload: { user }
    }
}

const stopSession = (session, username) => {
    return {
        type: 'SOCKET/' + DETERMINATE_SESSION,
        payload: {session, username}
    }
}

const setSessionData = (sessionData) => {
    return async dispatch => {
        dispatch(sendSessionData(sessionData));
        dispatch({
            type: SET_SESSION_DATA,
            payload: sessionData
        });
    }
}

const sendSessionData = (data) => {
    return {
        type: 'SOCKET/' + SEND_SESSION_DATA,
        payload: data
    }
}

const connectToSession = (hash) => {
    return {
        type: 'SOCKET/' + CONNECT_SESSION,
        payload: hash
    }
}

const setSessionStatus = (status) => {
    return {
        type: SET_SESSION_STATUS,
        payload: status
    }
}

const setVoice = (voice) => {
    return {
        type: SET_VOICE,
        payload: voice
    }
}

const setSession = (session) => {
    return {
        type: SET_SESSION,
        payload: session
    }
}

const setDefaultSocket = () => {
    return {
        type: SET_DEFAULT_SOCKET
    }
}

const setSceneAwaiting = (status) => {
    return {
        type: SET_SCENE_AWAITING,
        payload: status
    }
}

const changeSpeaker = (user, session) => {
    return {
        type: 'SOCKET/' + CHANGE_SPEAKER,
        payload: {user, session}
    }
}

const setChangeRequest = (req) => {
    return {
        type: SET_CHANGE_REQUEST,
        payload: req
    }
}

export {
    initSession,
    connectToSession,
    stopSession,
    setSessionStatus,
    setSession,
    setSessionData,
    sendSessionData,
    setVoice,
    setDefaultSocket,
    setSceneAwaiting,
    changeSpeaker,
    setChangeRequest
}