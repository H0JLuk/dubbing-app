import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import Thunk from 'redux-thunk'

import reducer from './reducers/rootReducer'

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(Thunk)
))

export default store;