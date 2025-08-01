export const putLocalStorageObject = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorageObject = (
    key,
    defaultValue = null,
) => {
    const value = localStorage.getItem(key)
    return value != null ? JSON.parse(value) : defaultValue
}

export const putLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

export const getLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export const removeLocalStorage = (key) => {
    return localStorage.removeItem(key)
}