import { combineReducers } from 'redux'
import store from './store'
import authToken from './authToken'
import profile from './profile'

export default combineReducers({
    authToken,
    profile,
    store
})
