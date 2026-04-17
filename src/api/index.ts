import axios, { AxiosError } from "axios";
import config from '@/config.json'
import qs from 'qs'
import { message } from "antd";
import useAppStore from "@/store/app-store";


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
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with response data
        return response;
    },
    function (error: AxiosError<{ code: number, message: string }>) {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        //有响应体
        if (error.response && error.response.data) {
            message.error(error.response.data.message)
            return Promise.reject(error.response.data)
        }
        //无响应体
        else {
            let msg = ''
            switch (error.code) {
                case 'ERR_NETWORK':
                    msg = '您的网络似乎断开了'
                    break
                case 'ECONNABORTED':
                    msg = '请求超时'
                    break
                default:
                    msg = error.message
            }
            message.error(msg)

        }
        return Promise.reject({ code: 1, message: error.message });
    }
);



export default instance