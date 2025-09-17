const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    clarification: { type: String, maxlength: 100 }
});

const orderSchema = new mongoose.Schema({
    items: [itemSchema],
    total: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commerce: { type: mongoose.Schema.Types.ObjectId, ref: 'Commerce', required: true },
    deliver_date: { type: Date, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);