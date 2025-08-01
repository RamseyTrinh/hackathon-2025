import http from '@/services/http'
import {TASK_API} from '@/constants/api'

export const getTasks = async () => {
    const response = await http.get(TASK_API.GET_TASKS)
    return response.data
}

export const getTask = async (taskId) => {
    const response = await http.get(TASK_API.GET_TASK(taskId))
    return response.data
}

export const createTask = async (payload) => {
    const response = await http.post(TASK_API.CREATE_TASK, payload)
    return response.data
}

export const updateTask = async (taskId, payload) => {
    const response = await http.put(TASK_API.UPDATE_TASK(taskId), payload)
    return response.data
}

export const deleteTask = async (taskId) => {
    const response = await http.delete(TASK_API.DELETE_TASK(taskId))
    return response.data
}

export const getTaskById = async (taskId) => {
    const response = await http.get(TASK_API.GET_TASK(taskId))
    return response.data
}

export const getTasksByUserId = async (userId, page, per_page) => {
    const response = await http.get(TASK_API.GET_TASKS_BY_USER(userId, page, per_page))
    return response.data
}

export const getDashboardTasks = async (userId) => {
    const response = await http.get(TASK_API.GET_DASHBOARD_TASKS(userId))
    return response.data
}

export const getBarChartData = async (userId) => {
    const response = await http.get(TASK_API.GET_BAR_CHART_DATA(userId))
    return response.data
}

export const getLineChartData = async (userId) => {
    const response = await http.get(TASK_API.GET_LINE_CHART_DATA(userId))
    return response.data
}

export const getOverviewTasks = async (userId) => {
    const response = await http.get(TASK_API.GET_OVERVIEW_TASKS(userId))
    return response.data
}



