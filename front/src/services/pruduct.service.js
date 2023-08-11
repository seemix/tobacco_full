import axiosService from './axios.service';

export const productService = {
    getByCategory: (params) => axiosService.get('/product/', { params: { ...params } }).then(value => value.data),
    getById: (id) => axiosService.get('/product/' + id).then(value => value.data),
    getNewProducts: () => axiosService.get('/product/new/get').then(value => value.data),
    createProduct: (data) => axiosService.post('/product', data).then(value => value.data),
    deleteImage: (fileName) => axiosService.patch('/product/image/' + fileName).then(value => value.data),
    updateProduct: (data) => axiosService.put('/product', data).then(value => value.data),
    deleteProduct: (data) => axiosService.delete('/product/', {
        params: {
            _id: data._id,
            picture: data.picture
        }
    }).then(value => value.data),
    addImage: (data) => axiosService.post('product/image/', data, { params: { productId: data.get('productId') } }).then(value => value.data),
    updateImage: (data) => axiosService.patch('/product/image/', data, {
        params: {
            productId: data.get('productId'),
            imageToUpdate: data.get('imageToUpdate')
        }
    }).then(value => value.data),
};