import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://datn-production.up.railway.app/" 
})
