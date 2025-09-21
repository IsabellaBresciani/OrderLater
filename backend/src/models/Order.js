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
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    deliver_date: { type: Date, required: true },
    state: { type: String, 
        enum: [
            "waiting to approve", 
            "waiting for payment", 
            "pending to deliver", 
            "completed", 
            "rejected", 
            "cancelled"
        ], 
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);