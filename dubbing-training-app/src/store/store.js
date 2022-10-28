import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import Thunk from 'redux-thunk'

import reducer from './reducers/rootReducer'
import socketMiddleware from './middleware/socketMiddleware'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_SOCKET_URL, {
    transports:	["websocket"]
});

const customSocketMiddleware = socketMiddleware(socket, 'SOCKET/');

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(Thunk, customSocketMiddleware)
))

export default store;