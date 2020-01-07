import axios from 'axios'

/**
 * axios é uma biblioteca que permite fazer chamadas a API
 */

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api