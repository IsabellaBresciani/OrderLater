const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    logo_image_url: {
        type: String,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
    },
    adress: {
        type: String,
    },

    // Relationships
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);