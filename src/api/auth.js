import api from './instance'
import Axios from 'axios'

const test = Axios.create({
    baseURL: 'https://b0fe3e19-d4c5-40c3-969f-d8328dbefa01.mock.pstmn.io'
})
export default {
    login: (username, password) => {
        return test.post('/auth/login', { username, password })
            .then(response => response.data)
    },
    register: (data) => {
        return api.post('/profile', data)
            .then(response => response.data)
    },
    checkUsernameAvailability: (username) => {
        return api.get('/auth/checkAvailability', { params: { username } })
            .then(response => response.data)
    },
    logout: (token) => {
        return api.post('/auth/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.data)
    },
}
