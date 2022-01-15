const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isUserAuthenticated, authorizedRole } = require("../middleWare/auth");

// call router function from express
const router = express.Router();
// using router making routes

// Make Get request for products
router.route('/products').get(getAllProducts);

// Make Get request for products details
router.route('/product/:id').get(getProductDetails);

// Make Get request for products -- ADMIN
router.route('/admin/products').get(isUserAuthenticated, authorizedRole("admin"), getAdminProducts);


// Make Post request for products
router.route('/admin/products/new').post(isUserAuthenticated, authorizedRole("admin"), createProduct);

//  Make a Put request for update a product
router.route('/admin/products/:id').put(isUserAuthenticated, authorizedRole("admin"), updateProduct);

// Make a Delete request for product
router.route('/admin/products/:id').delete(isUserAuthenticated, authorizedRole("admin"), deleteProduct);

// Make Put request for Review
router.route('/review').put(isUserAuthenticated, createProductReview);

// Make Get Request to see all reviews of Product and 
// Make Delete Request to delete own review
router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isUserAuthenticated, deleteReview);


module.exports = router;