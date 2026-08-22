const express = require("express");

const router = express.Router();

const {
    createActivity,
    getActivities,
    getActivityById,
    getActivitiesByDestination
} = require("../controllers/activityController");


// ============================================
// CREATE ACTIVITY
// POST /api/activities
// ============================================

router.post(
    "/",
    createActivity
);


// ============================================
// GET ALL ACTIVITIES
// GET /api/activities
// ============================================

router.get(
    "/",
    getActivities
);


// ============================================
// GET ACTIVITIES BY DESTINATION
// GET /api/activities/destination/:destinationId
// ============================================

router.get(
    "/destination/:destinationId",
    getActivitiesByDestination
);


// ============================================
// GET SINGLE ACTIVITY
// GET /api/activities/:id
// ============================================

router.get(
    "/:id",
    getActivityById
);


module.exports = router;