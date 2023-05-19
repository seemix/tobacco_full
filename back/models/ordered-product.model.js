const { Schema, model } = require('mongoose');

const orderedProductSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: { type: Number }
});

module.exports = model('OrderedProduct', orderedProductSchema);