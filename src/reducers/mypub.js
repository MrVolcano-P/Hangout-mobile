import { SET_MY_PUB } from 'src/actions/myPub'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_MY_PUB:
            return action.pub
        default:
            return state
    }
}