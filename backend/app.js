const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");

// IMPORT ROUTES
const product = require("./routes/productRoute.js");

app.use(express.json());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api/v1", product);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;