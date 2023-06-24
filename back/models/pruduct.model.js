const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, trim: true },
    pictures: [{ type: String }],
    oldPrice: { type: Number },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' }
}, { timestamps: true });

module.exports = model('Product', productSchema);