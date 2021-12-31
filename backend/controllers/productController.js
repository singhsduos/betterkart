const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product - ADMIN Route
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: "Product added successfully",
        product
    });
});



// Get Product Details 
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found ", 404));
    }

    res.status(200).json({
        success: true,
        product
    });

});


// Update Product - ADMIN Route
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product
    });

});


// Delete Product - ADMIN Route
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found ", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        product
    });

});

// Get all product list 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    // querying a keyword in your API
    const apiFeature = new ApiFeatures(Product.find(), req.query).search();
    const product = await apiFeature.query;
    res.status(200).json({
        success: true,
        product
    });
});

