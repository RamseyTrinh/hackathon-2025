import http from '@/services/http';
import {AUTH_API} from '@/constants/api';
import {putLocalStorage} from "@/utils/helpers/localStorageHelper.js";
import {LOCAL_STORAGE_KEYS} from "@/constants/localStorageKey.js";

export const login = async (payload) => {
    const response = await http.post(AUTH_API.LOGIN, payload)
    putLocalStorage(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN, response.data.access_token)
    return response;
};

export const logout = async () => {
    return await http.post(AUTH_API.LOGOUT);
};

export const register = async (payload) => {
    return await http.post(AUTH_API.REGISTER, payload);
};

export const resetPassword = async (payload) => {
    return await http.post(AUTH_API.RESET_PASSWORD, payload);
}

export const verifyCode = async (payload) => {
    return await http.post(AUTH_API.VERIFY_CODE, payload);
}
