const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: { type: String, trim: true, required: true },
    order: { type: Number },
    picture: { type: String }
});

module.exports = model('Category', categorySchema);