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
    add: (id, data, token) => {
        return api.post(`/user/party/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
    join: (id, token) => {
        return api.post(`/user/party/${id}/join`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
    //   sendMsg: (msg, id) => {
    //         return api.put('/party/' + id, {
    //             message: msg
    //         })
    //     }  
    getByUserID: (token) => {
        return api.get(`/user/party`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    }

}