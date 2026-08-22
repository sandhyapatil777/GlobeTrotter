const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            type: String,
            trim: true,
            default: ""
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

        additionalInformation: {
            type: String,
            trim: true,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);