const express = require("express");
const { newOrder, getSingleOrder, myOrders } = require("../controllers/orderController");
const { isUserAuthenticated, authorizedRole } = require("../middleWare/auth");

// call router function from express
const router = express.Router();

router.route("/order/new").post(isUserAuthenticated, newOrder);


router.route("/order/:id").get(isUserAuthenticated,getSingleOrder);


router.route("/orders/me").get(isUserAuthenticated, myOrders);



module.exports = router;