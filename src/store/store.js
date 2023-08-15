import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slice/auth/authSlice'
import { usersSlice } from './slice/users/usersSlice'
import {customerSlice} from './slice/customer/customerSlice'

export const store = configureStore({
    reducer: {
            customers: customerSlice.reducer,
            users: usersSlice.reducer,
            auth: authSlice.reducer,
    }
})