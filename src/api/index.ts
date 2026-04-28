import axios, { AxiosError } from "axios";
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
            config.transformRequest =
                (data) => {
                    if (data instanceof FormData) {
                        const obj = Object.fromEntries(data)
                        return qs.stringify(obj)
                    } else {
                        return qs.stringify(data)
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