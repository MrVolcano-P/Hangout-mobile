import axios from 'axios'
export const host = 'http://192.168.0.102:8080'
// export const host = 'http://10.80.6.13:8080'
export default axios.create({
    // baseURL: 'https://5eb3e2a2974fee0016ecdc59.mockapi.io',
    // baseURL: 'http://10.80.4.241:8080',
    baseURL: host,
})
