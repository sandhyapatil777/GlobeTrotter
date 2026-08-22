const User = require("../models/User");


// =====================================
// GET USER PROFILE
// =====================================

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch profile"
        });
    }
};


// =====================================
// UPDATE USER PROFILE
// =====================================

const updateProfile = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            username,
            phone,
            city,
            country,
            additionalInformation
        } = req.body;


        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // Check username if changed
        if (
            username &&
            username !== user.username
        ) {

            const existingUsername =
                await User.findOne({
                    username,
                    _id: { $ne: user._id }
                });

            if (existingUsername) {
                return res.status(409).json({
                    success: false,
                    message: "Username is already taken"
                });
            }

            user.username = username;
        }


        if (firstName !== undefined) {
            user.firstName = firstName;
        }

        if (lastName !== undefined) {
            user.lastName = lastName;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (city !== undefined) {
            user.city = city;
        }

        if (country !== undefined) {
            user.country = country;
        }

        if (additionalInformation !== undefined) {
            user.additionalInformation =
                additionalInformation;
        }


        await user.save();


        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                city: user.city,
                country: user.country,
                additionalInformation:
                    user.additionalInformation
            }
        });

    } catch (error) {

        console.error(
            "Update Profile Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to update profile"
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};