import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'
import supervisorReducer from './SupervisorSlice'
const store = configureStore({
    reducer: {
        app: userReducer,
        supervisor: supervisorReducer 
    },
});

export default store;