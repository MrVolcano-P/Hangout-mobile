import api from './instance'

export default {
    login: (data) => {
        console.log(data)
        return api.post('/login', data)
            .then(response => response.data)
    },
    register: (data) => {
        return api.post('/signup', data)
            .then(response => response.data)
    },
    checkUsernameAvailability: (username) => {
        return api.get(`/checkUsername/${username}`)
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
