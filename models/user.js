const mongoose = require('packageName');
const uniqueValidator = require('mongoose-unique-validator');

const userModel = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
})

userModel.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel);