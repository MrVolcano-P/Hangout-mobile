import api from './instance'

export default {
    get: () => {
        return api.get('/party')
            .then(response => response.data)
    },
}