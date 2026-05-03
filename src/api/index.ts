import axios, { AxiosError, AxiosRequestTransformer } from "axios";
import config from '@/config.json'
import qs from 'qs'
import { message } from "antd";
import useAppStore from "@/store/app-store";
import { resetAllStore } from "@/store/resetter";


const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 'ab428ee8-c6ae-4bee-86ca-a5bd3437cff5'
    }

})

//请求体转换器
const requestTransformer: AxiosRequestTransformer = (data) => {
    if (data instanceof FormData) {
        return qs.stringify(Object.fromEntries(data))
    } else {
        return qs.stringify(data)
    }
}

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {

        const url = config.url
        const method = config.method
        // Do something before the request is sent

        if ((url === '/my/article/add' && method === 'POST') || (url === '/my/article/info' && method === 'PUT')) {
            config.transformRequest = []
        }
        else {
            //挂载请求体转换器
            config.transformRequest = requestTransformer
        }
        // 请求头的params 转换器，把 FormData 格式的请求头数据转换为 querystring 格式的查询字符串
        config.paramsSerializer = {
            serialize(params) {
                if (params instanceof FormData) {
                    return qs.stringify(Object.fromEntries(params))
                } else {
                    return qs.stringify(params)
                }
            }
        }

        const token = useAppStore.getState().token
        if (url?.includes('/my') && token) {
            config.headers.Authorization = token
        }


        return config;

    }
);


// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        if (response.data) {
            // 有响应体的情况
            return response.data
        } else {
            // 没有响应体，则自定义一个标准的响应体，并返回
            return { code: 0, message: response.statusText }
        }
    },
    function (error: AxiosError<{ code: number; message: string }>) {
        if (error.response && error.response.data) {
            // 有响应体的情况
            if (error.response.status === 401) {
                // token 过期了
                useAppStore.getState().token && message.error('登录过期，请重新登录！')
                // 清空 store
                resetAllStore()
            } else {
                message.error(error.response.data.message)
            }

            return Promise.reject(error.response.data)
        } else {
            // 2. 无响应体：
            // 定义错误的提示消息
            let msg = ''
            // 判断错误类型，设置不同的错误消息
            switch (error.code) {
                case 'ERR_NETWORK':
                    msg = '您的网络似乎断开了...'
                    break
                case 'ECONNABORTED':
                    msg = '请求超时...'
                    break
                default:
                    msg = error.message
                    break
            }
            // 展示错误消息
            message.error(msg)
        }
        return Promise.reject({ code: 1, message: error.message })
    }
);



export default instance