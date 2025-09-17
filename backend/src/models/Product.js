const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        maxlength: 12,
    },
    name: {
        type: String,
        required: true,
        maxlength: 40,
    },
    description: {
        type: String,
        required: true,
        maxlength: 255,
    },
    image_url: {
        type: String,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
    },
    unit_price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    advance_in_days: {
        type: Number,
    },
    measure: {
        type: String,
        enum: ['kg', 'unit', 'liter'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);