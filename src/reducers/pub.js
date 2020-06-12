import { SET_PUB } from 'src/actions/pub'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PUB:
            return action.pub
        default:
            return state
    }
}