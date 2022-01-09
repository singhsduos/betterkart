const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary');
// Importing database
const mongooseConnect = require('./config/database');


// uncaughtException Error
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaughtException Error`);

    process.exit(1);
});

// config
dotenv.config({ path: "backend/config/config.env" });

// connceting to database
mongooseConnect();

// connecting cloudinary for images
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server app working on http://localhost:${process.env.PORT}`) 
});  


// Unhandle Promise Rejections Errors
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    // instruction for closing the server
    server.close(() => {
        process.exit(1);
    })
});