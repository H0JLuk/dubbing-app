import { combineReducers } from 'redux'
import socket from './socket'
import profile from './profile'
import scenes from './scenes'
import controls from './controls'

const reducer = combineReducers({
    socket,
    profile,
    scenes,
    controls
})

export default reducer;