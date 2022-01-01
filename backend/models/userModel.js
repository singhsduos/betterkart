const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// we are encrypting our passowrd before saving schema
// we are not using arrow function because "this" keyword not work on this function
userSchema.pre("save", async function (next) {
    // we are checking that if password is not modified 
    // than don't encrypt password again
    if (!this.isModified("password")) {
        next();
    }
     
    // if password is created new or used forgot password than modify it
    // and we used 10 character hash value means strong password
    this.password = await bcrypt.hash(this.password, 10);
});


// For JWT Token create own Method for User Schema
userSchema.methods.getJWTToken = function () {
    // there should be a secret key otherwise anyone can login in your web and can access as admin
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    
};

// compare user entered password to database
userSchema.methods.comparePassword = async function (enteredPassword) {
    // user enteredPassword is matched after decrypting the database password
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema); 