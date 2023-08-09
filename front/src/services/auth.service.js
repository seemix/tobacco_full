import axiosService from './axios.service';

export const authService = {
    login: (login, password) => axiosService.post('/auth/login', { login, password }).then(value => value.data),
    register: (login, password) => axiosService.post('/auth/register', { login, password }, {withCredentials: false}).then(value => value.data),
    logout: () => axiosService.post('/auth/logout').then(value => value.data),
    refresh: () => axiosService.get('/auth/refresh', { withCredentials: true }).then(value => value.data)
};