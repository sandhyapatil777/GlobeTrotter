const Expense = require("../models/Expense");
const Trip = require("../models/Trip");

// ============================================
// ADD EXPENSE
// POST /api/trips/:tripId/expenses
// ============================================

const addExpense = async (req, res) => {
    try {
        const { tripId } = req.params;

        const {
            category,
            description,
            amount,
            date,
            notes
        } = req.body;

        // Check required fields
        if (
            !category ||
            !description ||
            amount === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Category, description and amount are required"
            });
        }

        // Check amount
        if (Number(amount) < 0) {
            return res.status(400).json({
                success: false,
                message: "Amount cannot be negative"
            });
        }

        // Check trip belongs to logged-in user
        const trip = await Trip.findOne({
            _id: tripId,
            user: req.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Create expense
        const expense = await Expense.create({
            trip: tripId,
            category,
            description,
            amount: Number(amount),
            date: date || undefined,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense
        });

    } catch (error) {
        console.error(
            "Add Expense Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to add expense",
            error: error.message
        });
    }
};


// ============================================
// GET ALL EXPENSES
// GET /api/trips/:tripId/expenses
// ============================================

const getTripExpenses = async (req, res) => {
    try {
        const { tripId } = req.params;

        // Check trip belongs to logged-in user
        const trip = await Trip.findOne({
            _id: tripId,
            user: req.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        const expenses = await Expense.find({
            trip: tripId
        }).sort({
            date: 1,
            createdAt: 1
        });

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });

    } catch (error) {
        console.error(
            "Get Expenses Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch expenses",
            error: error.message
        });
    }
};


// ============================================
// UPDATE EXPENSE
// PUT /api/expenses/:id
// ============================================

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        // Make sure the expense belongs
        // to a trip owned by the logged-in user
        const trip = await Trip.findOne({
            _id: expense.trip,
            user: req.userId
        });

        if (!trip) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        const allowedFields = [
            "category",
            "description",
            "amount",
            "date",
            "notes"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                expense[field] =
                    field === "amount"
                        ? Number(req.body[field])
                        : req.body[field];
            }
        });

        if (expense.amount < 0) {
            return res.status(400).json({
                success: false,
                message: "Amount cannot be negative"
            });
        }

        await expense.save();

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense
        });

    } catch (error) {
        console.error(
            "Update Expense Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to update expense",
            error: error.message
        });
    }
};


// ============================================
// DELETE EXPENSE
// DELETE /api/expenses/:id
// ============================================

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        // Check ownership through trip
        const trip = await Trip.findOne({
            _id: expense.trip,
            user: req.userId
        });

        if (!trip) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        await Expense.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {
        console.error(
            "Delete Expense Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to delete expense",
            error: error.message
        });
    }
};


// ============================================
// EXPORT
// ============================================

module.exports = {
    addExpense,
    getTripExpenses,
    updateExpense,
    deleteExpense
};