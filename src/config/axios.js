import axios from 'axios';

const clientAxios = axios.create({ 
    baseURL: 'http://54.177.198.128:8001',
    responseType: 'json',
    withCredentials: false
});

export default clientAxios;