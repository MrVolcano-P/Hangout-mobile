import api from './instance'

export default {
    get: () => {
        return api.get('/pub')
            .then(response => response.data)
    },
    create: (data, token) => {
        return api.post('/user/pub', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.data)
    },
    getmypub: (token) => {
        return api.get('/user/pub', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.data)
    },
    updatepub: (data, token) => {
        return api.put('/user/pub', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.data)
    }
}