const Brand = require('../models/brand.model');
const Product = require('../models/pruduct.model');
const status = require('../enums/status.enum');

module.exports = {
    createBrand: async (req, res, next) => {
        try {
            const createdBrand = await Brand.create(req.body);
            res.status(status.created).json(createdBrand);
        } catch (e) {
            next(e);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const allBrands = await Brand.find().sort({ createdAt: 'desc' });
            res.status(status.created).json(allBrands);
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
            if (resp.length < 0) res.status(status.notFound);
            res.status(status.ok).json(resp);
        } catch (e) {
            next(e);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { _id } = req.params;
            await Brand.deleteOne({ _id });
            res.status(status.ok).json(_id);
        } catch (e) {
            next(e);
        }
    }
}