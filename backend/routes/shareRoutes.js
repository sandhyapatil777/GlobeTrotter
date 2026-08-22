const express = require("express");

const router = express.Router();

const {
    createShareLink,
    getSharedItinerary,
    disableShareLink,
    copySharedTrip
} = require("../controllers/shareController");

const authMiddleware = require("../middleware/authMiddleware");

// ============================================
// CREATE SHARE LINK
// POST /api/trips/:tripId/share
// ============================================

router.post(
    "/trips/:tripId/share",
    authMiddleware,
    createShareLink
);

// ============================================
// GET PUBLIC SHARED ITINERARY
// GET /api/shared/:shareId
// ============================================

router.get(
    "/shared/:shareId",
    getSharedItinerary
);

// ============================================
// DISABLE SHARE LINK
// DELETE /api/trips/:tripId/share
// ============================================

router.delete(
    "/trips/:tripId/share",
    authMiddleware,
    disableShareLink
);

// ============================================
// COPY SHARED TRIP
// POST /api/shared/:shareId/copy
// ============================================

router.post(
    "/shared/:shareId/copy",
    authMiddleware,
    copySharedTrip
);

module.exports = router;
