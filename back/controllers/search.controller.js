const status = require('../enums/status.enum');
const Product = require('../models/pruduct.model');

module.exports = {
    search: async (req, res, next) => {
        const { q } = req.query;
        if (!q || q.length < 3) res.status(status.badRequest);
        try {
            const results = await Product.find({
                '$or': [
                    { name: { $regex: q, $options: 'i' } },
                    { description: { $regex: q, $options: 'i' } }
                ]
            });
            res.status(status.ok).json(results);
        } catch (e) {
            next(e);
        }
    }
};