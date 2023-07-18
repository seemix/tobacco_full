const Order = require('../models/order.model');
const status = require('../enums/status.enum');
const { ORDERS_PER_PAGE } = require('../config/config');
const sendTgMessage = require('../services/telegram.service');

module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const newOrder = await Order.create(req.body);
            const order = await Order.findOne({ _id: newOrder._id })
                .populate({
                    path: 'products',
                    populate: {
                        path: 'product',
                        select: 'name price'
                    }
                });
            const io = req.app.get('io');
            io.emit('newOrder', order);
            //Send new order to Telegram Bot
            await sendTgMessage(order);
            res.status(status.ok).json(newOrder);
        } catch (e) {
            next(e);
        }
    },
    getAllOrders: async (req, res, next) => {
        try {
            const pages = Math.ceil(await Order.find().count() / ORDERS_PER_PAGE);
            const { page = 1, status, sort } = req.query;
            const filter = {};
            const sorting = {};
            if (status === 'completed') filter.completed = true;
            if (status === 'uncompleted') filter.completed = false;

            switch (sort) {
                case 'dateasc':
                    sorting.createdAt = -1;
                    break;
                case 'datedesc':
                    sorting.createdAt = 1;
                    break;
                case 'sumasc':
                    sorting.total = 1;
                    break;
                case 'sumdesc':
                    sorting.total = -1;
                    break;
                default:
                     break;
            }

            let { limit } = req.query;
            if (!limit) limit = ORDERS_PER_PAGE;
            const orders = await Order.find(filter)
                .sort(sorting)
                .limit(limit)
                .skip((page - 1) * ORDERS_PER_PAGE)
                .populate({
                    path: 'products',
                    populate: {
                        path: 'product',
                        select: 'name price'
                    }
                });
            res.json({ pages, page, orders });

        } catch (e) {
            next(e);
        }
    },
    setCompleteOrder: async (req, res, next) => {
        try {
            const { _id, completed } = req.body;
            await Order.updateOne({ _id }, { completed });
            res.status(status.ok).json({ _id, completed });
        } catch (e) {
            next(e);
        }
    },
    deleteOrderById: async (req, res, next) => {
        try {
            const { _id } = req.params;
            const deletedOrder = await Order.deleteOne({ _id });
            res.status(status.ok).json(deletedOrder);
        } catch (e) {
            next(e);
        }
    },
    getSum: async (req, res, next) => {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: '$total' },
                    completedSum: { $sum: { $cond: ['$completed', '$total', 0] } },
                    uncompletedSum: { $sum: { $cond: ['$completed', 0, '$total'] } },
                },
            },
        ]);
       res.json(result[0]);
    },

}
