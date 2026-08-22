const mongoose = require("mongoose");

// ============================================
// SHARE SCHEMA
// ============================================

const shareSchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        shareId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        isPublic: {
            type: Boolean,
            default: true
        },

        expiresAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Share",
    shareSchema
);