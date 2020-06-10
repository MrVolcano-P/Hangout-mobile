import api from './instance'

export default {
    get: () => {
        return api.get('/party')
            .then(response => response.data)
    },
    getById: (id) => {
        return api.get(`/pub/party/${id}`)
            .then(response => response.data)
    }
    ,
    add: (id, data,token) => {
        return api.post(`/user/party/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
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