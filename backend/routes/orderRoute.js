const express = require("express");
const { newOrder } = require("../controllers/orderController");
const { isUserAuthenticated, authorizedRole } = require("../middleWare/auth");

// call router function from express
const router = express.Router();

router.route("/order/new").post(isUserAuthenticated,newOrder);

module.exports = router;