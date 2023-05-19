const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
    name: { type: String, trim: true, required: true }
}, { timestamps: true });

module.exports = model('Brand', brandSchema);