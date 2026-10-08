import axios from 'axios';

const api_url = 'http://10.27.112.66:8080/api/v1'

export const api = axios.create({
    baseURL: api_url,
})