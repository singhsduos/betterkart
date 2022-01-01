const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


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

    sendToken(user, 201, res, "User registered successfully");

});


// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    // fetch the email and password from body
    const { email, password } = req.body;

    // check if user entered email or password
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    // now find the email and password in your data-base and 
    // select method is used because we marked false in schema so that no one can see it 
    const user = await User.findOne({ email }).select("+password");

    // if user is not found in our database then handle error
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    // check that password is matched with our database by using own define comparePassword method
    const isPasswordMatched = await user.comparePassword(password);
     
    // if password is incorrect than show the error
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }


    sendToken(user, 200, res, "User login successfully");

});