import {
    SET_DEFAULT_VIDEO_STATUS, SET_RECORDING_VOICE_STATUS, SET_RECORDED_VIDEO_STATUS,
    SET_DEFAULT_VIDEO_DISABLE, SET_RECORDING_VOICE_DISABLE, SET_RECORDED_VIDEO_DISABLE
} from '../actions/actionTypes'

const initialState = {
    isDefaultVideoPlaying: false,
    isRecordingVoice: false,
    isRecordedVideoPlaying: false,

    isDefaultVideoDisabled: true,
    isRecordingVoiceDisabled: true,
    isRecordedVideoDisabled: true
}

const controls = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEFAULT_VIDEO_STATUS:
            return { ...state, isDefaultVideoPlaying: action.payload }
        case SET_RECORDING_VOICE_STATUS:
            return { ...state, isRecordingVoice: action.payload }
        case SET_RECORDED_VIDEO_STATUS:
            return { ...state, isRecordedVideoPlaying: action.payload }

        case SET_DEFAULT_VIDEO_DISABLE:
            return { ...state, isDefaultVideoDisabled: action.payload }
        case SET_RECORDING_VOICE_DISABLE:
            return { ...state, isRecordingVoiceDisabled: action.payload }
        case SET_RECORDED_VIDEO_DISABLE:
            return { ...state, isRecordedVideoDisabled: action.payload }
        default:
            return { ...state }
    }
}

export default controls;