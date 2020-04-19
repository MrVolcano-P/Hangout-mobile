import api from './instance'

export default {
    login: (username, password) => {
        return api.post('/auth/login', { username, password })
            .then(response => response.data)
    },
    register: (data) => {
        return api.post('/auth/register', data)
            .then(response => response.data)
    },
    checkUsernameAvailability: (username) => {
        return api.get('/auth/checkAvailability', { params: { username } })
            .then(response => response.data)
    },
    logout: (token) => {
        return api.post('/auth/logout', null, { headers: {
            Authorization: `Bearer ${token}`,
        } })
            .then(response => response.data)
    },
}
