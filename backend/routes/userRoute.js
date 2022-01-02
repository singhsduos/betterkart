const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controllers/userController");
const { isUserAuthenticated, authorizedRole } = require("../middleWare/auth");
const router = express.Router();

// Make Post request for registering the user
router.route('/register').post(registerUser);

// Make Post request for login the user
router.route("/login").post(loginUser);

// Make Post request for forgot password
router.route("/password/forgot").post(forgotPassword);

// Make Put request to change password
router.route("/password/reset/:token").put(resetPassword);

//  Own Profile Details
router.route("/me").get(isUserAuthenticated, getUserDetails);


// Make Put request to change password
router.route("/password/update").put(isUserAuthenticated, updatePassword);



// Make Get request for logged out
router.route("/logout").get(logoutUser);




module.exports = router;