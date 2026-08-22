const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            trim: true
        },

        country: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        image: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            trim: true
        },

        popular: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Destination", destinationSchema);