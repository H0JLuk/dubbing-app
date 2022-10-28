import { combineReducers } from 'redux'
import profile from './profile'
import scenes from './scenes'
import settings from './settings'
import users from './users'

const reducer = combineReducers({
    profile,
    scenes,
    settings,
    users
})

export default reducer;