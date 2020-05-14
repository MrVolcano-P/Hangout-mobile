import api from './instance'

export default {
    get: () => {
        return api.get('/party')
            .then(response => response.data)
    },
    getById: (id) => {
        return api.get('/party/' + id)
            .then(response => response.data)
    }
    ,
    add: (title, amount, date, username, placeId) => {
        return api.post('/party', {
            title: title,
            owner: username,
            member: [username],
            amount: amount,
            date: date,
            placeID: placeId
        })
    },
    join: (member, id) => {
        return api.put('/party/' + id, {
            member: member
        })
    },
    sendMsg: (msg, id) => {
        console.log(msg)
        console.log(id)
        return api.put('/party/' + id, {
            message: msg
        })
    }

}