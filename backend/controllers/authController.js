const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


        // -------------------------------
        // REQUIRED FIELDS
        // -------------------------------

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


        // -------------------------------
        // PASSWORD LENGTH
        // -------------------------------

        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });

        }


        // -------------------------------
        // CONFIRM PASSWORD
        // -------------------------------

        if (password !== confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });

        }


        // -------------------------------
        // CHECK EMAIL
        // -------------------------------

        const existingEmail = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingEmail) {

            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });

        }


        // -------------------------------
        // CHECK USERNAME
        // -------------------------------

        const existingUsername = await User.findOne({
            username: username
        });

        if (existingUsername) {

            return res.status(409).json({
                success: false,
                message: "Username is already taken"
            });

        }


        // -------------------------------
        // HASH PASSWORD
        // -------------------------------

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // -------------------------------
        // CREATE USER
        // -------------------------------

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


        // -------------------------------
        // CREATE TOKEN
        // -------------------------------

        const token =
            generateToken(user._id);


        // -------------------------------
        // RESPONSE
        // -------------------------------

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

    }

    catch (error) {

        console.error(
            "Signup Error:",
            error
        );

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


        // -------------------------------
        // CHECK FIELDS
        // -------------------------------

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        // -------------------------------
        // FIND USER
        // -------------------------------

        const user = await User.findOne({

            email: email.toLowerCase()

        });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // -------------------------------
        // CHECK PASSWORD
        // -------------------------------

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // -------------------------------
        // TOKEN
        // -------------------------------

        const token =
            generateToken(user._id);


        // -------------------------------
        // RESPONSE
        // -------------------------------

        res.status(200).json({

            success: true,

            message:
                "Login successful",

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

    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Server error during login"

        });

    }

};


module.exports = {
    signup,
    login
};