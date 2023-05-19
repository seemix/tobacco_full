import axiosService from './axios.service';

export const categoryService = {
    getAll: axiosService.get('/category').then(value => value.data),
    getById: (id) => axiosService.get('/category/'+id).then(value => value.data),
    createCategory: (data) => axiosService.post('/category', data).then(value => value.data),
    updateCategory: (data) => axiosService.put('/category', data).then(value => value.data),
    deleteImage: (fileName) => axiosService.patch('/category/image/'+fileName).then(value => value.data),
    saveOrder: (data) => axiosService.patch('/category', data).then(value => value.data),
    deleteCategory: (id) => axiosService.delete('/category/'+id).then(value => value.data)
}