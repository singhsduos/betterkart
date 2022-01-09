const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const cloudinary = require('cloudinary').v2;
const crypto = require("crypto");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // cloudinary
    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
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

    // Get Password Token
    const resetToken = user.getResetPasswordToken();

    // this is for saving the value in schema of passwordtoken and passwordexpire
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

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


        // so again save these values in schema
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));


    }

});

//  Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
 
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    // so again save these upper values in schema
    await user.save();

    sendToken(user, 200, res, "Password changed successfully");
   
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});


// Update Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res, "Password updated successfully");
});


// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
 

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
       userFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Your Profile Update Successfully"
    });
    
});


// Admin get all users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});


// Admin get single user details
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);


    if (!user) {
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    });
});


//Admin Update Users Profile
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {


    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Admin Updated User Role Successfully"
    });

});


//Admin Delete Users 
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {


    const user = await User.findById(req.params.id);
    
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "Admin Removed User Successfully"
    });

});
