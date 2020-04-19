import api from './instance'

export default {
    get: (token) => {
        return api.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
    update: (data, token) => {
        return api.put('/user/profile', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
    updateImage: (image, token) => {
        const formData = new FormData()
        formData.append('image', {
            uri: image.uri,
            name: image.fileName,
            type: image.type,
        })
        return api.put('/user/profile/image', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
    },
}
