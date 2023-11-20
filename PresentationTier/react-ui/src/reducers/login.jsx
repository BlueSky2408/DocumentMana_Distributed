import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isRegistered: false,
    infoLogin: {},
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Login
        fetchLogin(state, params) {
            state.infoLogin = null;
            state.isAuthenticated = false;
        },
        fetchLoginSuccess: (state, action) => {
            const { data, message } = action.payload;
            toastSuccess(message);
            state.infoLogin = data;
            state.isAuthenticated = true;
        },
        fetchLoginFailed: (state, action) => {
            const { message } = action.payload;
            toastError({ message });
            state.isAuthenticated = false;
        },
        // Register
        fetchRegister(state, params) {
            state.infoLogin = null;
            state.isRegistered = false;
        },
        fetchRegisterSuccess: (state, action) => {
            const { data, message } = action.payload;
            toastSuccess(message);
            state.infoLogin = data;
            state.isRegistered = true;
        },
        fetchRegisterFailed: (state, action) => {
            const { message } = action.payload;
            toastError({ message });
            state.isRegistered = false;
        },
        // Logout
        logout: (state) => {
            state.infoLogin = {};
            state.isAuthenticated = false;
        },
    },
});

export const {
    fetchLogin, fetchLoginSuccess, fetchLoginFailed,
    fetchRegister, fetchRegisterSuccess, fetchRegisterFailed,
    logout,
} = loginSlice.actions;

export default loginSlice.reducer;
