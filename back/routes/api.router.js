const Router = require('express');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const authRouter = require('./auth.router');
const orderRouter = require('./order.router');
const searchRouter = require('./search.router');
const sliderRouter = require('./slider.router');
const brandRouter = require('./brand.router');

const router = Router();
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/auth', authRouter);
router.use('/order', orderRouter);
router.use('/search', searchRouter);
router.use('/slider', sliderRouter);
router.use('/brand', brandRouter);

module.exports = router;