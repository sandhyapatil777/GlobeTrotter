const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination",
            required: true
        },

        type: {
            type: String,
            enum: [
                "Sightseeing",
                "Food",
                "Adventure",
                "Shopping",
                "Entertainment",
                "Nature",
                "Culture",
                "Other"
            ],
            default: "Other"
        },

        description: {
            type: String,
            default: ""
        },

        cost: {
            type: Number,
            default: 0,
            min: 0
        },

        duration: {
            type: Number,
            default: 1,
            min: 0
        },

        image: {
            type: String,
            default: ""
        },

        popularity: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Activity", activitySchema);