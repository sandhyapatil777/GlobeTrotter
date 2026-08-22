const mongoose = require("mongoose");

const itineraryActivitySchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },

        stop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stop",
            required: true
        },

        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        startTime: {
            type: String,
            default: ""
        },

        endTime: {
            type: String,
            default: ""
        },

        notes: {
            type: String,
            default: ""
        },

        order: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ItineraryActivity",
    itineraryActivitySchema
);