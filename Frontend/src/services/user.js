import http from '@/services/http'
import {USER_API} from '@/constants/api'

export const getCurrentUser = async () => {
    return (await http.get(USER_API.GET_CURRENT_USER))
}

export const updateUser = async (userId, data) => {
    return (await http.put(USER_API.UPDATE_USER(userId), data))
}

export const changePassword = async (userId, data) => {
    return (await http.put(USER_API.CHANGE_PASSWORD(userId), data))
}

export const updateNewPassword = async (data) => {
    return (await http.post(USER_API.UPDATE_NEW_PASSWORD, data))
}

export const deleteUser = async (userId) => {
    return (await http.delete(USER_API.DELETE_USER(userId)))
}