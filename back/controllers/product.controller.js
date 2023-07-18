const fs = require('fs');
const path = require('path');

const Product = require('../models/pruduct.model');
const status = require('../enums/status.enum');
const ApiError = require('../errors/api.error');
const { PRODUCTS_PER_PAGE } = require('../config/config');

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const newProd = await Product.create(req.body);
            res.json(newProd).status(status.created);
        } catch (e) {
            next(new ApiError('Error creating product', status.serverError));
        }
    },
    getProductsByCategory: async (req, res, next) => {
        try {
            const { category, brand } = req.query;
            let query = { category };
            if (brand && brand !== 'null' && brand !== 'all' && brand !== 'undefined') query.brand = brand;
            const pages = Math.ceil(await Product.find(query).count() / PRODUCTS_PER_PAGE);
            const { page = 1 } = req.query;
            let { limit } = req.query;
            if (!limit || limit === 'undefined') limit = PRODUCTS_PER_PAGE;
            const products = await Product.find(query)
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
                .select(['name', 'pictureLink', 'oldPrice', 'price'])
                .populate({
                    path: 'pictures',
                    select: 'filename',
                    strictPopulate: false
                });
            res.status(status.ok).json(newProducts);
        } catch (e) {
            next(e);
        }
    },
    getProductById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id })
                .populate({ path: 'category', select: 'name' })
                .populate({ path: 'pictures', select: 'filename' })
            res.status(status.ok).json(product);
        } catch (e) {
            next(e);
        }
    },

    getImage: async (req, res, next) => {
        try {
            const { filename } = req.params;
            if (!filename) res.status(status.notFound);
            const imagePath = path.join(__dirname, '../uploads/products', filename);
            if (fs.existsSync(imagePath)) {
                res.status(status.ok).sendFile(imagePath);
            } else {
                res.status(status.notFound).json('File not found')
            }
        } catch (e) {
            next(e);
        }
    },
    // deleteImage: async (req, res, next) => {
    //     try {
    //         const { filename } = req.params;
    //         if (filename) res.status(status.badRequest);
    //         fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'products', filename));
    //         await Product.updateOne({ picture: filename }, { picture: null });
    //         res.status(status.ok).json(filename);
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    updateProduct: async (req, res, next) => {
        try {
            const { _id } = req.body;
            if (!_id) next(new ApiError('Incorrect ID', status.badRequest));
            await Product.updateOne({ _id }, { ...req.body });
            const updatedProduct = await Product.findById(_id).populate({ path: 'brand' });
            res.status(status.ok).json(updatedProduct);
        } catch (e) {
            next(e);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.query;
            const productForDelete = await Product.findOne({ _id: id });

            for (const picture of productForDelete.pictures) {
                const imagePath = path.join(__dirname, 'uploads', 'products', picture);
                if (fs.existsSync(imagePath))
                    fs.unlinkSync(imagePath);
            }
            await Product.deleteOne({ _id: id });
            res.status(status.ok).json(id);
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
            res.json({ productId, pictures: updatedPictures }).status(status.created);
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
            res.json({ productId, pictures: updatedPictures }).status(status.ok);
        } catch (e) {
            next(e);
        }
    },
    deleteImage: async (req, res, next) => {
        try {
            const { productId, image } = req.query;
            const productForUpdate = await Product.findById(productId);
            const updatedPictures = productForUpdate.pictures.filter(item => item !== image);
            await Product.updateOne({ _id: productId }, { pictures: updatedPictures });
            fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'products', image));
            res.json(updatedPictures).status(status.ok);
        } catch (e) {
            next(e);
        }
    }
}