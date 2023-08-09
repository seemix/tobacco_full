const Order = require('../models/order.model');
const status = require('../enums/status.enum');
const { ORDERS_PER_PAGE } = require('../config/config');
const sendTgMessage = require('../services/telegram.service');
const sumService = require('../services/sum.service');

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
            res.status(status.OK).json(newOrder);
        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            const pages = Math.ceil(await Order.find().count() / ORDERS_PER_PAGE);
            const { page = 1, filter, sort } = req.query;
            const filtering = {};
            const sorting = {};

            if (sort) sorting[sort.split(':')[0]] = +sort.split(':')[1];
            if (filter) filtering[filter.split(':')[0]] = Boolean(filter.split(':')[1]);

            let { limit } = req.query;
            if (!limit) limit = ORDERS_PER_PAGE;
            const orders = await Order.find(filtering)
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
            res.status(status.OK).json({ _id, completed });
        } catch (e) {
            next(e);
        }
    },

    deleteOrderById: async (req, res, next) => {
        try {
            const { _id } = req.params;
            const deletedOrder = await Order.deleteOne({ _id });
            res.status(status.OK).json(deletedOrder);
        } catch (e) {
            next(e);
        }
    },

    getSum: async (req, res, next) => {
        try {
            const result = await Order.aggregate([sumService]);
            res.json(result[0]);
        } catch (e) {
            next(e);
        }
    }
}
