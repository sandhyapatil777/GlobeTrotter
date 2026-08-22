const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// ============================================
// ROUTES
// ============================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const stopRoutes = require("./routes/stopRoutes");
const activityRoutes = require("./routes/activityRoutes");
const itineraryActivityRoutes = require("./routes/itineraryActivityRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes =
    require("./routes/expenseRoutes");

// ============================================
// ENVIRONMENT VARIABLES
// ============================================

dotenv.config();

// ============================================
// APP
// ============================================

const app = express();

// ============================================
// DATABASE CONNECTION
// ============================================

connectDB();

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// ============================================
// TEST ROUTE
// ============================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "GlobeTrotter Backend is running!"
    });
});

// ============================================
// API ROUTES
// ============================================

// --------------------------------------------
// Authentication
// /api/auth/...
// --------------------------------------------

app.use(
    "/api/auth",
    authRoutes
);

// --------------------------------------------
// User Profile
// /api/users/...
// --------------------------------------------

app.use(
    "/api/users",
    userRoutes
);

// --------------------------------------------
// Destinations
// /api/destinations/...
// --------------------------------------------

app.use(
    "/api/destinations",
    destinationRoutes
);

// --------------------------------------------
// Trips
// /api/trips/...
// --------------------------------------------

app.use(
    "/api/trips",
    tripRoutes
);

// --------------------------------------------
// Bookings
// /api/bookings/...
// --------------------------------------------

app.use(
    "/api/bookings",
    bookingRoutes
);

// --------------------------------------------
// Stops
// /api/trips/:tripId/stops/...
// --------------------------------------------

app.use(
    "/api",
    stopRoutes
);

// --------------------------------------------
// Budget
// /api/trips/:tripId/budget
// --------------------------------------------

app.use(
    "/api",
    budgetRoutes
);

// Expenses
app.use(
    "/api",
    expenseRoutes
);
// --------------------------------------------
// Activities
// /api/activities/...
// --------------------------------------------

app.use(
    "/api/activities",
    activityRoutes
);

// --------------------------------------------
// Itinerary Activities
// /api/trips/:tripId/...
// /api/itinerary-activities/...
// --------------------------------------------

app.use(
    "/api",
    itineraryActivityRoutes
);


// ============================================
// 404 ROUTE
// ============================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `GlobeTrotter Backend running on http://localhost:${PORT}`
    );
});