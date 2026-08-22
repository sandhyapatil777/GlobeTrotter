const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/userController");


// GET USER PROFILE
router.get(
    "/profile",
    authMiddleware,
    getProfile
);


// UPDATE USER PROFILE
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


module.exports = router;