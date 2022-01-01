const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");

app.use(express.json());

// IMPORT ROUTES
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute");


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;