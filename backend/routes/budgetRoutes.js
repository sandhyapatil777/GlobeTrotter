const express = require("express");

const router = express.Router();

const {
    getTripBudget
} = require("../controllers/budgetController");

const authMiddleware = require("../middleware/authMiddleware");

// ============================================
// GET TRIP BUDGET
// GET /api/trips/:tripId/budget
// ============================================

router.get(
    "/trips/:tripId/budget",
    authMiddleware,
    getTripBudget
);

module.exports = router;