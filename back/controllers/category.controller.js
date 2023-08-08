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
            res.json(newCat).status(status.CREATED);

        } catch (e) {
            next(new ApiError('Error creating category', status.SERVER_ERROR));
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            const { _id, name, picture } = req.body;
            if (!_id) next(new ApiError('Incorrect ID', status.BAD_REQUEST));
            let objToUpdate = { name };
            if (req.fileName) {
                objToUpdate = { ...objToUpdate, picture: req.fileName };
                const oldFile = path.join(__dirname, '..', 'uploads', 'category', picture);
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile);
                }
            }
            await Category.updateOne({ _id }, { ...objToUpdate });
            const updatedCategory = await Category.findById(_id);
            res.status(status.OK).json(updatedCategory);
        } catch (e) {
            next(e);
        }
    },

    getAllCategories: async (req, res, next) => {
        try {
            const allCats = await Category.find().sort({ order: 1 });
            res.json(allCats).status(status.OK);
        } catch (e) {
            next(new ApiError('Error retrieving categories', status.SERVER_ERROR));
        }
    },
    getCategoryById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            res.status(status.OK).json(category);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) next(new ApiError('Bad category id', status.BAD_REQUEST));
            const currentProduct = await Product.find({ category: id });
            for (const currentProductElement of currentProduct) {
                if (currentProduct.picture) {
                    const filePath = path.join(__dirname, '..', 'uploads', 'products', currentProductElement.picture);
                    if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
                }
            }
            await Product.deleteMany({ category: id });
            const categoryPict = await Category.findOne({ _id: id });
            if (categoryPict.picture) fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'category', categoryPict.picture));
            const del = await Category.deleteOne({ _id: id });
            res.status(status.NO_CONTENT).json(del);
        } catch (e) {
            next(e);
        }
    },

    deleteImage: async (req, res, next) => {
        try {
            const { fileName } = req.params;
            if (fileName) res.status(status.BAD_REQUEST);
            const filePath = path.join(__dirname, '..', 'uploads', 'category', fileName);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            await Category.updateOne({ picture: fileName }, { picture: null });
            res.status(status.OK).json(fileName);
        } catch (e) {
            next(e);
        }

    },

    getImage: async (req, res, next) => {
        try {
            const { filename } = req.params;
            if (!filename) res.status(status.NOT_FOUND);
            const imagePath = path.join(__dirname, '../uploads/category', filename);
            if (fs.existsSync(imagePath)) {
                res.status(status.OK).sendFile(imagePath);
            } else {
                res.status(status.NOT_FOUND).json('File not found')
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
            res.status(status.OK).json('Reorder success');
        } catch (e) {
            next(new ApiError('Error reorder', status.BAD_REQUEST));
        }
    }
}