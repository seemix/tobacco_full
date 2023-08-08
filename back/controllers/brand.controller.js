const Brand = require('../models/brand.model');
const Product = require('../models/pruduct.model');
const status = require('../enums/status.enum');
const ApiError = require('../errors/api.error');

module.exports = {

    createBrand: async (req, res, next) => {
        try {
            const createdBrand = await Brand.create(req.body);
            res.status(status.CREATED).json(createdBrand);
        } catch (e) {
            next(new ApiError('Error creating brand', 400));
        }
    },

    getAll: async (req, res, next) => {
        try {
            const allBrands = await Brand.find().sort({ createdAt: 'desc' });
            res.status(status.CREATED).json(allBrands);
        } catch (e) {
            next(e);
        }
    },

    getByCategory: async (req, res, next) => {
        try {
            const { category } = req.params;
            const brandsByCat = await Product.find({ category })
                .select('brand')
                .populate({
                    path: 'brand'
                });
            const resp = brandsByCat.map(item => {
                return {
                    _id: item.brand._id,
                    name: item.brand.name
                }
            }).filter((elem, index, self) =>
                    index === self.findIndex((t) => (
                        t._id === elem._id
                    ))
            );
            if (resp.length < 0) res.status(status.NOT_FOUND);
            res.status(status.OK).json(resp);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const { _id } = req.params;
            await Brand.deleteOne({ _id });
            res.status(status.OK).json(_id);
        } catch (e) {
            next(e);
        }
    }
}