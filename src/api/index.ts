import axios from "axios";
import config from '@/config.json'
import qs from 'qs'


const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 'ab428ee8-c6ae-4bee-86ca-a5bd3437cff5'
    }

})


// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before the request is sent
        config.transformRequest =
            (data) => {
                if (data instanceof FormData) {
                    const obj = Object.fromEntries(data)
                    return qs.stringify(obj)
                } else {
                    return qs.stringify(data)
                }
            }

        return config;
    }
);


export default instance