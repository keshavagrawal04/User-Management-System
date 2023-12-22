const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    contactNumber: {
        type: Number,
        require: true,
        length: 10
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
