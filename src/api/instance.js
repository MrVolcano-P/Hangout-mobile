import axios from 'axios'
// export const host = 'http://192.168.0.102:8080'
// export const host = 'http://10.80.5.186:8080'
export const host = 'https://hangout-api.crabdance.com'
export default axios.create({
    baseURL: host,
})
