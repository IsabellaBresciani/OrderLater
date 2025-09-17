const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
        maxlength: 20,
    },
    url_imagen: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        maxlength: 20,
    },
    discount: {
        type: Number
    },
    minimum_notice: {
        type: Number
    },
    price: {
        type: float,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);