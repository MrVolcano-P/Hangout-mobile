import moment from 'moment'

export const fundComma = value => parseFloat(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const dateTime = (dateTime) => moment(dateTime).format('DD-MM-YYYY, kk:mm')

export const dateMonth = (date) => moment(date).format('DD MMM YYYY')
