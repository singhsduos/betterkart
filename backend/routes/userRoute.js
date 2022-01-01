const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

// Make Post request for registering the user
router.route('/register').post(registerUser);


module.exports = router;