import api from './instance'

export default {
    get: (token) => {
        return api.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
    getFull: () => {
        return api.get('/profile')
            .then(response => response.data)
    },
    update: (data, token) => {
        return api.put('/user/profile', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
    updateImage: (data, token) => {
        return api.put('/user/profile/image', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
}
