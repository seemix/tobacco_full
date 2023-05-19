import axiosService from './axios.service';

export const brandService = {
    getBrandsByCategory: (category) => axiosService.get(`/brand/${category}`).then(value => value.data),
    getAllBrands: () => axiosService.get('/brand').then(value => value.data),
    createBrand: (data) => axiosService.post('/brand', data).then(value => value.data),
    deleteById: (_id) => axiosService.delete(`/brand/${_id}`).then(value => value.data)
}