import {createSlice} from '@reduxjs/toolkit'
import {getLocalStorage, putLocalStorage, removeLocalStorage} from '@/utils/helpers/localStorageHelper'
import {LOCAL_STORAGE_KEYS} from '@/constants/localStorageKey'
import {getCurrentUserAction, loginAction} from './authAction'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: getLocalStorage(LOCAL_STORAGE_KEYS.IS_LOGIN) || false,
        user: getLocalStorage(LOCAL_STORAGE_KEYS.INFO) ?  JSON.parse(getLocalStorage(LOCAL_STORAGE_KEYS.INFO)) : null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            removeLocalStorage(LOCAL_STORAGE_KEYS.INFO)
            removeLocalStorage(LOCAL_STORAGE_KEYS.IS_LOGIN)
            removeLocalStorage(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                state.user = action.payload.data.user
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.error = action.payload?.message || "Login failed";
            })
            .addCase(getCurrentUserAction.fulfilled, (state, action) => {
                state.isAuthenticated = true
                putLocalStorage(LOCAL_STORAGE_KEYS.INFO, JSON.stringify(action.payload))
                putLocalStorage(LOCAL_STORAGE_KEYS.IS_LOGIN, true)
                state.user = action.payload
            })
            .addCase(getCurrentUserAction.rejected, (state, action) => {
                // You can uncomment these lines if needed to handle the rejected case.
                // state.isAuthenticated = false
                // state.user = null
            })
    },
})

export const {logout} = authSlice.actions
export default authSlice.reducer
