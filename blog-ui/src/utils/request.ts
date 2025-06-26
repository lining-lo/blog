import axios from "axios";

//创建实例
const http = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http