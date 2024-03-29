const fs = require('fs');
const path = require('path');

const Product = require('../models/pruduct.model');
const status = require('../enums/status.enum');
const ApiError = require('../errors/api.error');
const { PRODUCTS_PER_PAGE } = require('../config/config');

module.exports = {

    createProduct: async (req, res, next) => {
        const { name, description, oldPrice, price, category, brand } = req.body;
        try {
            const newProd = await Product.create({
                name, description, oldPrice, price, category, brand,
                picture: req.fileName
            });
            res.json(newProd).status(status.CREATED);
        } catch (e) {
            next(new ApiError('Error creating product', status.BAD_REQUEST));
        }
    },

    getProductsByCategory: async (req, res, next) => {
        try {
            const { categoryId, brand } = req.query;
            const filter = { category: categoryId };
            if (brand && brand !== 'null' && brand !== 'all' && brand !== 'undefined') filter.brand = brand;

            const pages = Math.ceil(await Product.find({ category: categoryId }).count() / PRODUCTS_PER_PAGE);
            const { page = 1 } = req.query;
            let { limit } = req.query;
            if (!limit || limit === 'undefined') limit = PRODUCTS_PER_PAGE;

            const products = await Product.find(filter)
                .sort({ createdAt: -1 })
                .limit(Number(limit))
                .skip((page - 1) * PRODUCTS_PER_PAGE)
                .populate({
                    path: 'brand',
                    select: 'name',
                    strictPopulate: false
                })
                .populate({
                    path: 'pictures',
                    select: 'filename',
                    strictPopulate: false
                });
            res.json({ page, pages, products });
        } catch (e) {
            next(e)
        }
    },

    getNewProducts: async (req, res, next) => {
        try {
            const newProducts = await Product
                .find()
                .sort({ updatedAt: 1 })
                .limit(5)
                .select(['name', 'picture', 'oldPrice', 'price']);
            res.status(status.OK).json(newProducts);
        } catch (e) {
            next(e);
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id })
                .populate({ path: 'category', select: 'name' });
            res.status(status.OK).json(product);
        } catch (e) {
            next(e);
        }
    },

    getImage: async (req, res, next) => {
        try {
            const { filename } = req.params;
            if (!filename) res.status(status.NOT_FOUND);
            const imagePath = path.join(__dirname, '../uploads/products', filename);
            if (fs.existsSync(imagePath)) {
                res.status(status.OK).sendFile(imagePath);
            } else {
                res.status(status.NOT_FOUND).json('File not found')
            }
        } catch (e) {
            next(e);
        }
    },

    deleteImage: async (req, res, next) => {
        try {
            const { filename } = req.params;
            if (filename) res.status(status.BAD_REQUEST);
            const imagePath = path.join(__dirname, '..', 'uploads', 'products', filename);
            if (fs.existsSync(imagePath))
                fs.unlinkSync(imagePath);
            await Product.updateOne({ picture: filename }, { picture: '' });
            res.status(status.OK).json(filename);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { _id, oldPicture } = req.body;
            if (!_id) next(new ApiError('Incorrect ID', status.BAD_REQUEST));
            if (oldPicture) {
                const imagePath = path.join(__dirname, '..', 'uploads', 'products', oldPicture);
                if (fs.existsSync(imagePath))
                    fs.unlinkSync(imagePath);
            }
            const updObj = req.body;
            if(req.fileName) updObj.picture = req.fileName;
            await Product.updateOne({ _id }, updObj);
            const updatedProduct = await Product.findById(_id).populate({ path: 'brand' });
            res.status(status.OK).json(updatedProduct);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const { _id, picture } = req.query;
            if (picture) {
                const imagePath = path.join(__dirname, '..', 'uploads', 'products', picture);
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }

            await Product.deleteOne({ _id });
            res.status(status.OK).json(_id);
        } catch (e) {
            next(e);
        }
    },

    addImage: async (req, res, next) => {
        try {
            const { productId } = req.query;
            const productForUpdate = await Product.findById(productId);
            const updatedPictures = [...productForUpdate.pictures, req.fileName];
            await Product.updateOne({ _id: productId }, { pictures: updatedPictures });
            res.json({ productId, pictures: updatedPictures }).status(status.CREATED);
        } catch (e) {
            next(e);
        }
    },

    replaceImage: async (req, res, next) => {
        try {
            const { productId, imageToUpdate } = req.query;
            const productForUpdate = await Product.findById(productId);
            const updatedPictures = productForUpdate.pictures.map(item => (item === imageToUpdate ? req.fileName : item));
            await Product.updateOne({ _id: productId }, { pictures: updatedPictures });
            fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'products', imageToUpdate));
            res.json({ productId, pictures: updatedPictures }).status(status.OK);
        } catch (e) {
            next(e);
        }
    },
}