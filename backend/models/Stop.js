const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },

        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination",
            required: true
        },

        arrivalDate: {
            type: Date,
            required: true
        },

        departureDate: {
            type: Date,
            required: true
        },

        order: {
            type: Number,
            required: true
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Stop", stopSchema);