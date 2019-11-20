import axios from 'axios';

const API = axios.create({
    // TODO change this for deployment
    // baseURL for our api
    baseURL: 'http://localhost:8888',
    responseType: 'json'
});

export default API;