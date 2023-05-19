const { Schema, model } = require('mongoose');

const sliderSchema = new Schema({
    slide: { type: String, required: true },
    order: { type: Number },
    text: { type: String }
});

module.exports = model('Slider', sliderSchema);