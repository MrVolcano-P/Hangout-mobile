import api from './instance'

export default {
    get: (id) => {
        return api.get(`/review/${id}`)
            .then(response => response.data)
    },
    add: (id, data, token) => {
        return api.post(`/user/review/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    }
}