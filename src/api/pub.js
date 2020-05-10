import api from './instance'

export default {
    get: () => {
        return api.get('/pub')
            .then(response => response.data)
    },
}