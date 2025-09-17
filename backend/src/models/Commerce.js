const mongoose = require('mongoose');

const commerceSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, maxlength: 50 },
    address: { type: String, required: true, maxlength: 100 },
    phone: { type: String, required: true, maxlength: 15 },
    logo_url: { type: String, match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i },
}, {
    timestamps: true
});

module.exports = mongoose.model('Commerce', commerceSchema);