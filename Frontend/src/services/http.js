import axios from 'axios'
import {getLocalStorage} from "@/utils/helpers/localStorageHelper.js";
import {LOCAL_STORAGE_KEYS} from "@/constants/localStorageKey.js";

const http = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    transformRequest: [
        function (data, headers) {
            const accessToken = getLocalStorage(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN)
            headers['Authorization'] = `Bearer ${accessToken}`
            return JSON.stringify(data)
        },
    ],
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.response.use(null, (error) => {
    if ([401, 403].includes(error.response?.status)) {
        // Thực hiện hành động logout hoặc xử lý khác nếu cần
        // console.log('Unauthorized or Forbidden');
    }
    return Promise.reject(error)
})

export default http
