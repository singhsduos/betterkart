const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
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


// Make Put request to update user profile
router.route("/me/update").put(isUserAuthenticated, updateProfile);

// Make Get request for logged out
router.route("/logout").get(logoutUser);


// Make Get request for admin to access all users
router.route("/admin/users").get(isUserAuthenticated, authorizedRole("admin"), getAllUser);

// Make Get request for admin to access single user, update user role, delete user
router
    .route("/admin/user/:id")
    .get(isUserAuthenticated, authorizedRole("admin"), getSingleUser)
    .put(isUserAuthenticated, authorizedRole("admin"), updateUserRole)
    .delete(isUserAuthenticated, authorizedRole("admin"), deleteUser);




module.exports = router;