const path = require('path');
const fs = require('fs');

const Slider = require('../models/slider.model');
const status = require('../enums/status.enum');

module.exports = {

    createSlide: async (req, res, next) => {
        try {
            const newSlide = await Slider.create({
                order: req.body.order, text: req.body.text, slide: req.fileName
            });
            res.status(status.CREATED).json(newSlide);
        } catch (e) {
            next(e);
        }
    },

    updateSlide: async (req, res, next) => {
        try {
            let slide = '';
            if (req.file) slide = req.file.filename;
            const { text, _id, picture } = req.body;
            const objToUpdate = { text };
            if (slide) objToUpdate.slide = slide;
            await Slider.updateOne({ _id }, objToUpdate);
            if (picture) {
                const oldFile = path.join(__dirname, '..', 'uploads', 'slider', picture);
                if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
            }
            const updatedSlide = await Slider.findOne({ _id });
            res.status(status.OK).json(updatedSlide);
        } catch (e) {
            next(e);
        }
    },

    getAllSlides: async (req, res, next) => {
        try {
            const slides = await Slider.find().sort('order');
            res.status(status.OK).json(slides);
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
            await Slider.bulkWrite(bulk);
            res.status(status.OK).json('Reorder success');
        } catch (e) {
            next(e);
        }
    },

    deleteSlide: async (req, res, next) => {
        try {
            const { _id } = req.params;
            if (!_id) res.status(status.NOT_FOUND);
            const slide = await Slider.findOne({ _id });
            const imagePath = path.join(__dirname, '..', 'uploads', 'slider', slide.slide);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                await Slider.deleteOne({ _id })
                res.status(status.OK).json(_id);
            } else {
                res.status(status.NOT_FOUND).json('File not found')
            }
        } catch (e) {
            next(e);
        }
    }
}