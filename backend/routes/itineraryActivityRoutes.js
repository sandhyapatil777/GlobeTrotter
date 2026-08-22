const express = require("express");

const router = express.Router();

const {
    addActivityToItinerary,
    getTripItineraryActivities,
    updateItineraryActivity,
    deleteItineraryActivity
} = require("../controllers/itineraryActivityController");

const authMiddleware = require("../middleware/authMiddleware");


router.post(
    "/trips/:tripId/stops/:stopId/activities",
    authMiddleware,
    addActivityToItinerary
);


router.get(
    "/trips/:tripId/itinerary-activities",
    authMiddleware,
    getTripItineraryActivities
);


router.put(
    "/itinerary-activities/:id",
    authMiddleware,
    updateItineraryActivity
);


router.delete(
    "/itinerary-activities/:id",
    authMiddleware,
    deleteItineraryActivity
);


module.exports = router;