import api from './instance'

export default {
    get: () => {
        return api.get('/review')
            .then(response => response.data)
    },
    add: (text, username, pubID, date) => {
        return api.post('/review', {
            text: text,
            profile: username,
            pubID: pubID,
            date: date
        })
    }
}