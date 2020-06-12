import { combineReducers } from 'redux'
import authToken from './authToken'
import profile from './profile'
import pub from './pub'
import mypub from './mypub'
export default combineReducers({
    authToken,
    profile,
    pub,
    mypub
})
