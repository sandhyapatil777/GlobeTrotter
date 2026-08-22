// Trip model placeholder.
const mongoose = require("mongoose");


// =====================================
// ACTIVITY SCHEMA
// =====================================

const activitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            trim: true,
            default: ""
        },

        date: {
            type: Date
        },

        time: {
            type: String,
            default: ""
        },

        notes: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        _id: true
    }
);


// =====================================
// PLACE SCHEMA
// =====================================

const placeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            trim: true,
            default: ""
        },

        country: {
            type: String,
            trim: true,
            default: ""
        },

        notes: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        _id: true
    }
);


// =====================================
// TRIP SCHEMA
// =====================================

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tripName: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        budget: {
            type: Number,
            default: 0,
            min: 0
        },

        places: {
            type: [placeSchema],
            default: []
        },

        activities: {
            type: [activitySchema],
            default: []
        },

        notes: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "planned",
                "ongoing",
                "completed"
            ],
            default: "planned"
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model(
    "Trip",
    tripSchema
);