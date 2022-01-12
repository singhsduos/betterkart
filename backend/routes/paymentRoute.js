const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isUserAuthenticated } = require("../middleWare/auth");


const router = express.Router();

router.route("/payment/process").post(isUserAuthenticated, processPayment);

router.route("/stripeapikey").get(isUserAuthenticated, sendStripeApiKey);

module.exports = router;