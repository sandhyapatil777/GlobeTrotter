const express = require("express");

const router = express.Router();

const {
    addStop,
    getTripStops,
    updateStop,
    deleteStop
} = require("../controllers/stopController");

const authMiddleware = require("../middleware/authMiddleware");


// ============================================
// ADD STOP TO TRIP
// POST /api/trips/:tripId/stops
// ============================================
router.post(
    "/trips/:tripId/stops",
    authMiddleware,
    addStop
);


// ============================================
// GET ALL STOPS OF A TRIP
// GET /api/trips/:tripId/stops
// ============================================
router.get(
    "/trips/:tripId/stops",
    authMiddleware,
    getTripStops
);


// ============================================
// UPDATE STOP
// PUT /api/stops/:stopId
// ============================================
router.put(
    "/stops/:stopId",
    authMiddleware,
    updateStop
);


// ============================================
// DELETE STOP
// DELETE /api/stops/:stopId
// ============================================
router.delete(
    "/stops/:stopId",
    authMiddleware,
    deleteStop
);


module.exports = router;