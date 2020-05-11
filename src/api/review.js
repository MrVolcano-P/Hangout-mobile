import api from './instance'

export default {
    get: () => {
        return api.get('/review')
            .then(response => response.data)
    },
}