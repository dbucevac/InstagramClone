import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export default Axios;