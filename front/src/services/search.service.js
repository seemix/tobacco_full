import axiosService from './axios.service';

export const searchService = {
    search: (searchQuery) => axiosService.get('/search', { params: { searchQuery } })
        .then(value => value.data)
};