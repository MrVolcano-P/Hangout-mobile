import { SET_PROFILE } from 'src/actions/profile'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return action.profile
        default:
            return state
    }
}