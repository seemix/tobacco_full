const path = require('path');
const fs = require('fs');

const Category = require('../models/category.model');
const Product = require('../models/pruduct.model');
const status = require('../enums/status.enum');
const ApiError = require('../errors/api.error');

module.exports = {
    createCategory: async (req, res, next) => {
        try {
            const newCat = await Category.create(
                { name: req.body.name, picture: req.fileName, order: req.body.order }
            );
            res.json(newCat).status(status.created);

        } catch (e) {
            next(new ApiError('Error creating category', status.serverError));
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const { _id, name } = req.body;
            if (!_id) next(new ApiError('Incorrect ID', status.badRequest));
            let objToUpdate = { name };
            if (req.fileName) {
                objToUpdate = { ...objToUpdate, picture: req.fileName }
            }
            await Category.updateOne({ _id }, { ...objToUpdate });
            const updatedCategory = await Category.findById(_id);
            res.status(status.ok).json(updatedCategory);
        } catch (e) {
            next(e);
        }
    },
    getAllCategories: async (req, res, next) => {
        try {
            const allCats = await Category.find().sort({ order: 1 });
            res.json(allCats).status(status.ok);
        } catch (e) {
            next(new ApiError('Error retrieving categories', status.serverError));
        }
    },
    getCategoryById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            res.status(status.ok).json(category);
        } catch (e) {
            next(e);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) next(new ApiError('Bad category id', status.badRequest));
            const currentProduct = await Product.find({ category: id });
            for (const currentProductElement of currentProduct) {
                if (currentProduct.picture) {
                    fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'products', currentProductElement.picture));
                }
            }
            await Product.deleteMany({ category: id });
            const categoryPict = await Category.findOne({ _id: id });
            if (categoryPict.picture) fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'category', categoryPict.picture));
            const del = await Category.deleteOne({ _id: id });
            res.status(status.noContent).json(del);
        } catch (e) {
            next(e);
        }
    },
    deleteImage: async (req, res, next) => {
        try {
            const { fileName } = req.params;
            if (fileName) res.status(status.badRequest);
            fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'category', fileName));
            await Category.updateOne({ picture: fileName }, { picture: null });
            res.status(status.ok).json(fileName);
        } catch (e) {
            next(e);
        }

    },
    getImage: async (req, res, next) => {
        try {
            const { filename } = req.params;
            if (!filename) res.status(status.notFound);
            const imagePath = path.join(__dirname, '../uploads/category', filename);
            if (fs.existsSync(imagePath)) {
                res.status(status.ok).sendFile(imagePath);
            } else {
                res.status(status.notFound).json('File not found')
            }
        } catch (e) {
            next(e);
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const data = req.body;
            for (let i = 0; i < data.length; i++) {
                data[i].order = i;
            }
            const bulk = data.map(item => ({
                updateOne: {
                    filter: { _id: item._id },
                    update: { order: item.order }
                }
            }));
            await Category.bulkWrite(bulk);
            res.status(200).json('Reorder success');
        } catch (e) {
            next(new ApiError('Error reorder', 400));
        }
    }
}