const mongoose = require("mongoose");

// ============================================
// EXPENSE SCHEMA
// ============================================

const expenseSchema = new mongoose.Schema(
    {
        // Trip this expense belongs to
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },

        // Expense category
        category: {
            type: String,
            enum: [
                "transport",
                "stay",
                "meals",
                "activities",
                "other"
            ],
            required: true
        },

        // Expense description
        description: {
            type: String,
            trim: true,
            required: true
        },

        // Expense amount
        amount: {
            type: Number,
            required: true,
            min: 0
        },

        // Optional expense date
        date: {
            type: Date,
            default: Date.now
        },

        // Optional notes
        notes: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Expense",
    expenseSchema
);