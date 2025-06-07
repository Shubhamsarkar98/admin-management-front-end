import axios from "axios"
import { getFromLocalStorage } from "../utils/localstorage";
import { AUTH_TOKEN } from "../constants/constants";



const defaultAxiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI
})

export const axiosClient = (headers = {}) => {
    defaultAxiosClient.defaults.headers.common = {
        ...defaultAxiosClient.defaults.headers.common,
        ...headers,
    };
    defaultAxiosClient.defaults.headers.common['Content-Type'] = 'application/json';
    const token: any = getFromLocalStorage(AUTH_TOKEN)
    if (token) {
        defaultAxiosClient.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`
    }
    return defaultAxiosClient
}

export const axiosClientWithoutAuth = (headers = {}) => {
    defaultAxiosClient.defaults.headers.common = {
        ...defaultAxiosClient.defaults.headers.common,
        ...headers,
    };
    defaultAxiosClient.defaults.headers.common['Content-Type'] = 'application/json';
    return defaultAxiosClient
}

