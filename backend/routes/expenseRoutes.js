const express = require("express");

const router = express.Router();

const {
    addExpense,
    getTripExpenses,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

const authMiddleware =
    require("../middleware/authMiddleware");

// ============================================
// ADD EXPENSE
// POST /api/trips/:tripId/expenses
// ============================================

router.post(
    "/trips/:tripId/expenses",
    authMiddleware,
    addExpense
);

// ============================================
// GET ALL EXPENSES OF A TRIP
// GET /api/trips/:tripId/expenses
// ============================================

router.get(
    "/trips/:tripId/expenses",
    authMiddleware,
    getTripExpenses
);

// ============================================
// UPDATE EXPENSE
// PUT /api/expenses/:id
// ============================================

router.put(
    "/expenses/:id",
    authMiddleware,
    updateExpense
);

// ============================================
// DELETE EXPENSE
// DELETE /api/expenses/:id
// ============================================

router.delete(
    "/expenses/:id",
    authMiddleware,
    deleteExpense
);

module.exports = router;