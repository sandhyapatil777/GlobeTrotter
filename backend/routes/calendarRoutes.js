const express = require("express");

const router = express.Router();

const {
    getTripCalendar
} = require("../controllers/calendarController");

const authMiddleware = require("../middleware/authMiddleware");

// ============================================
// GET TRIP CALENDAR / TIMELINE
// GET /api/trips/:tripId/calendar
// ============================================

router.get(
    "/trips/:tripId/calendar",
    authMiddleware,
    getTripCalendar
);

module.exports = router;