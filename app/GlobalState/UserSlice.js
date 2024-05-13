import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    wssc: null,
    token: null,
}

const userSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        SetUserData: (state, action) => {
            state.user = action.payload.user;
            state.wssc = action.payload.wssc;
            state.token = action.payload.token;
        },
        UpdateUserData: (state, action) => {
            state.user = action.payload
        },
        LogOut: (state) => {
            state.user = null;
            state.wssc = null;
            state.token = null;
        }
    }
})

export default userSlice.reducer;
export const { SetUserData, UpdateUserData, LogOut } = userSlice.actions