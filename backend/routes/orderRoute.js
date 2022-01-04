const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isUserAuthenticated, authorizedRole } = require("../middleWare/auth");

// call router function from express
const router = express.Router();

router.route("/order/new").post(isUserAuthenticated, newOrder);


router.route("/order/:id").get(isUserAuthenticated,getSingleOrder);


router.route("/orders/me").get(isUserAuthenticated, myOrders);

router
    .route("/admin/orders")
    .get(isUserAuthenticated, authorizedRole("admin"), getAllOrders);

router
    .route("/admin/order/:id")
    .put(isUserAuthenticated, authorizedRole("admin"), updateOrder)
    .delete(isUserAuthenticated, authorizedRole("admin"), deleteOrder);



module.exports = router;