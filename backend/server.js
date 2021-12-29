const app = require("./app");
const dotenv = require("dotenv");
const envFile = process.env;


// config
dotenv.config({ path: "backend/config/config.env" });

app.listen(envFile.PORT, () => {
    console.log(`Server app working on http://localhost:${envFile.PORT}`) 
});