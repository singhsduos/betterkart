const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

// call router function from express
const router = express.Router();

// using router making routes

// Make Get request for products
router.route('/products').get(getAllProducts);

// Make Get request for products details
router.route('/products/:id').get(getProductDetails);

// Make Post request for products
router.route('/products/new').post(createProduct);

//  Make a Put request for update a product
router.route('/products/:id').put(updateProduct);

// Make a Delete request for product
router.route('/products/:id').delete(deleteProduct);


module.exports = router;