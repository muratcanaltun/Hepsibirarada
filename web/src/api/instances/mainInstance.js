import axios from "axios";

export const mainInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

export default mainInstance
