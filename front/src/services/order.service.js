import axiosService from './axios.service';

export const orderService = {
    createOrder: (data) => axiosService.post('/order', data).then(value => value.data),
    getAllOrders: (page) => axiosService.get(`/order?page=${page}`).then(value => value.data),
    setCompleted: (data) => axiosService.patch('/order', data).then(value => value.data),
    deleteOrderById: (_id) => axiosService.delete('/order/'+_id).then(value => value.data)
};