import {
    SET_DEFAULT_VIDEO_STATUS, SET_RECORDING_VOICE_STATUS, SET_RECORDED_VIDEO_STATUS,
    SET_DEFAULT_VIDEO_DISABLE, SET_RECORDING_VOICE_DISABLE, SET_RECORDED_VIDEO_DISABLE
} from './actionTypes'

const setDefaultVideoStatus = (status) => {
    return {
        type: SET_DEFAULT_VIDEO_STATUS,
        payload: status
    }
}

const setRecordingVoiceStatus = (status) => {
    return {
        type: SET_RECORDING_VOICE_STATUS,
        payload: status
    }
}

const setRecordedVideoStatus = (status, session) => {
    return {
        type: SET_RECORDED_VIDEO_STATUS,
        payload: status
    }
}

const setDefaultVideoDisable = (status) => {
    return {
        type: SET_DEFAULT_VIDEO_DISABLE,
        payload: status
    }
}

const setRecordingVoiceDisable = (status) => {
    return {
        type: SET_RECORDING_VOICE_DISABLE,
        payload: status
    }
}

const setRecordedVideoDisable = (status) => {
    return {
        type: SET_RECORDED_VIDEO_DISABLE,
        payload: status
    }
}

export {
    setDefaultVideoStatus,
    setRecordingVoiceStatus,
    setRecordedVideoStatus,
    setDefaultVideoDisable,
    setRecordingVoiceDisable,
    setRecordedVideoDisable
}