const status = require('../enums/status.enum');
const Product = require('../models/pruduct.model');

module.exports = {

    search: async (req, res, next) => {
        const { searchQuery } = req.query;
        if (!searchQuery || searchQuery.length < 3) res.status(status.BAD_REQUEST);
        try {
            const results = await Product.find({
                '$or': [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            });
            res.status(status.OK).json(results);
        } catch (e) {
            next(e);
        }
    }
};