const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");


exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
    // fetch stored token from cookies
    const { token } = req.cookies;

    // if token is not found then resources will not be available
    if (!token) {
        return next(new ErrorHandler("Please Login to access the resources", 401));
    }

    // verify token from database with the help of secret key
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // find the login user
    req.user = await User.findById(decodedData.id);

    next();
});

exports.authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resources`, 403)
            );
        }

        next();
    }
}