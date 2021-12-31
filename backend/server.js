const app = require("./app");
const dotenv = require("dotenv");
const envFile = process.env;
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


const server = app.listen(envFile.PORT, () => {
    console.log(`Server app working on http://localhost:${envFile.PORT}`) 
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