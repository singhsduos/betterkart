import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SCSS/OrderSuccess/ordersuccess.css";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;