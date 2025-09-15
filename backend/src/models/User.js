const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    last_name: {
        type: String,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },   
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'business_owner', 'user'],
        default: 'user',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);