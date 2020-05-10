import api from './instance'

export default {
    get: () => {
        return api.get('/party')
            .then(response => response.data)
    },
    add: (title,amount,date,username,placeId) => {
        return api.post('/party',{
            title:title,
            owner: username,
            member:[username],
            amount:amount,
            date:date,
            placeID:placeId
        })
    }
}