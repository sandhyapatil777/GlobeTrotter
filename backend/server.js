const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GlobeTrotter Backend is running!"
    });
});

// ===============================
// ROUTES
// ===============================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/destinations", require("./routes/destinationRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`GlobeTrotter Backend running on http://localhost:${PORT}`);
});