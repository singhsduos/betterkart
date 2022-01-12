const express = require("express");
const cookie = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleWare/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// IMPORT ROUTES
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// Middleware for errors
app.use(errorMiddleware);

module.exports = app;