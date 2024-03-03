import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'


const store = configureStore({
    reducer: {
        app: userReducer
    },
});

export default store;