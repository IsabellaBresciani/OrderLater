const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
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

shopSchema.methods.checkOwner = function(shop, owner_id) {
    const owner = shop.owner._id.toString('hex');
    if (owner !== owner_id.toString()) {
        return false;
    }
    return true;
}

module.exports = mongoose.model('Shop', shopSchema);