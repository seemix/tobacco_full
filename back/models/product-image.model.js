const { Schema, model } = require('mongoose');

const productImageSchema = new Schema({
    filename: { type: String, required: true }
});

module.exports = model('ProductImage', productImageSchema);