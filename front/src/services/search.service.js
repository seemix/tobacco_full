import axiosService from './axios.service';

export const searchService = {
    search: (q) => axiosService.get(`/search?q=${q}`).then(value => value.data)
};