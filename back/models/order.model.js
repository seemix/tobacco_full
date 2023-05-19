const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    customerName: { type: String, required: true },
    customerSurname: { type: String },
    customerPhone: { type: String, required: true },
    address: { type: String },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            count: { type: Number, default: 1 }
        }
    ],
    total: { type: Number },
    shipping: { type: Boolean, default: false },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = model('Order', orderSchema);