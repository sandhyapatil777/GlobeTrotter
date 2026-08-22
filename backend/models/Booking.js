// Booking model placeholder.
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        destination: {
            type: String,
            required: true
        },

        bookingDate: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "cancelled"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Booking",
    bookingSchema
);