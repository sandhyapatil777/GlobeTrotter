const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");

// =====================================
// GENERATE JWT
// =====================================

const generateToken = (userId) => {
    return jwt.sign(
        {
            userId: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

// =====================================
// SIGN UP
// =====================================

const signup = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            phone,
            city,
            country,
            additionalInformation
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const existingEmail = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const existingUsername = await User.findOne({
            username: username
        });

        if (existingUsername) {
            return res.status(409).json({
                success: false,
                message: "Username is already taken"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone,
            city,
            country,
            additionalInformation
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
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

        console.error("Signup Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during signup"
        });
    }
};

// =====================================
// LOGIN
// =====================================

const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
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

        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

// =====================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// =====================================

const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email"
            });
        }

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires =
            new Date(
                Date.now() + 15 * 60 * 1000
            );

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password reset token generated successfully",
            resetToken,
            expiresAt:
                user.resetPasswordExpires
        });

    } catch (error) {

        console.error(
            "Forgot Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while generating reset token"
        });
    }
};

// =====================================
// RESET PASSWORD
// POST /api/auth/reset-password
// =====================================

const resetPassword = async (req, res) => {
    try {

        const {
            resetToken,
            newPassword,
            confirmPassword
        } = req.body;

        if (
            !resetToken ||
            !newPassword ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Reset token, new password and confirm password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Passwords do not match"
            });
        }

        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: {
                $gt: new Date()
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid or expired reset token"
            });
        }

        user.password =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password reset successfully"
        });

    } catch (error) {

        console.error(
            "Reset Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while resetting password"
        });
    }
};

// =====================================
// EXPORT
// =====================================

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword
};