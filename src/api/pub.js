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
    }
}