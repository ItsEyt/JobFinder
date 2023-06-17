import { configureStore } from '@reduxjs/toolkit'
import UserManagementSlice from './src/features/UserManagementSlice';


export const store = configureStore({
    reducer:{
        userManagement: UserManagementSlice,
    }
});