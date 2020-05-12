import { combineReducers } from 'redux'
import authToken from './authToken'
import profile from './profile'
import pub from './pub'
export default combineReducers({
    authToken,
    profile,
    pub
})
