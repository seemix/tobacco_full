import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';

export const login = createAsyncThunk(
    'authSlice/Login',
    async (credentials, thunkAPI) => {
        try {
            return await authService.login(credentials.login, credentials.password);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    'authSlice/Logout',
    async (_, thunkAPI) => {
        try {
            return await authService.logout();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const refresh = createAsyncThunk(
    'authSlice/Refresh',
    async (_, thunkAPI) => {
        try {
            return await authService.refresh();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const register = createAsyncThunk(
    'authSlice/Register',
    async (credentials, thunkAPI) => {
        try {
            return await authService.register(credentials.login, credentials.password);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        auth: false,
        status: null,
        error: null,
        user: {
            id: null,
            login: null
        }
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
                state.auth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload.response.data.message;
                state.auth = false;
            })
            .addCase(refresh.pending, state => {
                state.status = 'loading';
                state.error = null;
                state.auth = false;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.status = 'fulfilled';
               localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
                state.auth = true;
            })
            .addCase(refresh.rejected, state => {
                state.status = 'error';
                state.auth = false;
            })
            .addCase(logout.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logout.fulfilled, state => {
                state.auth = false;
                state.user = null;
                state.status = 'logout';
                localStorage.removeItem('token');
            })
    }
});

const authStore = authSlice.reducer;
export default authStore;