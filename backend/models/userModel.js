const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [3, "Name should have more than 3 characters"],
        maxlength: [20, "Name should not have more than 20 characters"]
    },

    email: {
        type: String,
        required: [true, "Please enter your mail"],
        validate: [validator.isEmail, "Please enter your valid email"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please enter your mail"],
        minlength: [8, "password should have more than 8 characters"],
        select: false
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        }
    },

    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

module.exports = mongoose.model("User", userSchema); 