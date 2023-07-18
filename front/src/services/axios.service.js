import axios from 'axios';
import { config } from '../config/config';

const axiosService = axios.create({ baseURL: config.BACKEND_URL, withCredentials: true });
axiosService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

axiosService.interceptors.response.use((config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axiosService.get('/auth/refresh', { withCredentials: true });
                if(!response.data.accessToken) return;
                localStorage.setItem('token', response.data.accessToken);
                return axiosService.request(originalRequest);
            } catch (e) {
                return e;
            }
        }
        throw error;
    }
)

export default axiosService;