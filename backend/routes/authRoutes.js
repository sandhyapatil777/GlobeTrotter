const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

// ============================================
// SIGN UP
// ============================================

router.post(
    "/signup",
    signup
);

// ============================================
// LOGIN
// ============================================

router.post(
    "/login",
    login
);

// ============================================
// FORGOT PASSWORD
// ============================================

router.post(
    "/forgot-password",
    forgotPassword
);

// ============================================
// RESET PASSWORD
// ============================================

router.post(
    "/reset-password",
    resetPassword
);

module.exports = router;