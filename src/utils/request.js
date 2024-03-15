// Encapsulating axios
import axios from "axios";
import {getToken, removeToken} from "@/utils/token";
import router from "@/router";

// 1.Root domain name configuration
// 2.Set Timeout
// 3.Request interceptor/Response interceptor

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    if (getToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
}, (error) => {

    return Promise.reject(error)
})

request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
        removeToken();
        router.navigate('login').then(() => {
            window.location.reload();
        })
    }
    return Promise.reject(error)
})

export {request}