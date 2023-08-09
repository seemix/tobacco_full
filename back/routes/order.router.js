const orderRouter = require('express').Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/', orderController.getAllOrders);

orderRouter.patch('/', authMiddleware, orderController.setCompleteOrder);
orderRouter.delete('/:_id', authMiddleware, orderController.deleteOrderById);
orderRouter.get('/sum', orderController.getSum);

module.exports = orderRouter;