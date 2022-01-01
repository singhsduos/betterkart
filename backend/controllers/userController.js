const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const User = require("../models/userModel");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "This is a sample pic",
            url: "profilepicUrl",
        },
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    });

});