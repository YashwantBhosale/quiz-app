import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.role = null;
            state.error = null;
        },
        dismissRequest: (state) => {
            state.loading = false;
            state.error = null;
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout, dismissRequest } = authSlice.actions;
export const selectAuth = state => state.auth;
export default authSlice.reducer;