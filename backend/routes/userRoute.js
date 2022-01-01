const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// Make Post request for registering the user
router.route('/register').post(registerUser);

// Make Post request for login the user
router.route("/login").post(loginUser);


module.exports = router;