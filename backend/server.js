const app = require("./app");
const dotenv = require("dotenv");
const envFile = process.env;
// Importing database
const mongooseConnect = require('./config/database');


// config
dotenv.config({ path: "backend/config/config.env" });

// connceting to database
mongooseConnect();


app.listen(envFile.PORT, () => {
    console.log(`Server app working on http://localhost:${envFile.PORT}`) 
});  