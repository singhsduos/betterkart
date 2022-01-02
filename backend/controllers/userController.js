const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");


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

    // check if user entered email or password or not
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    // now find the email and password in your data-base and 
    // select method is used because we marked false in schema so that no one can see it our user passwords
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

// Logout the User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    // first find user through email in database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resettoken = user.getResetPasswordToken();

    // this is for saving the value in schema of passwordtoken and passwordexpire
    await user.save({ validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resettoken}`;

    const message = `Your password reset token is here \n\n ${resetPasswordUrl} \n\nIf you have not requested this email than please ignore it.`;

    try {

        // Send the email to user after generating token
        await sendMail({
            email: user.email,
            subject: `Betterkart Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
        
    } catch (error) {
        // if there is error than we already generated a these below token so it's duty define them as undefined
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        console.log(error.message);
 
        // so again save these values in schema
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));

    
    }

});