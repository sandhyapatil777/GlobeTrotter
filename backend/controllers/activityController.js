const Activity = require("../models/Activity");


// ============================================
// CREATE ACTIVITY
// POST /api/activities
// ============================================

const createActivity = async (req, res) => {
    try {
        const {
            name,
            destination,
            type,
            description,
            cost,
            duration,
            image,
            popularity
        } = req.body;

        if (!name || !destination) {
            return res.status(400).json({
                success: false,
                message: "Activity name and destination are required"
            });
        }

        const activity = await Activity.create({
            name,
            destination,
            type,
            description,
            cost,
            duration,
            image,
            popularity
        });

        res.status(201).json({
            success: true,
            message: "Activity created successfully",
            activity
        });

    } catch (error) {
        console.error("Create Activity Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create activity",
            error: error.message
        });
    }
};


// ============================================
// GET ALL ACTIVITIES
// GET /api/activities
// ============================================

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find()
            .populate(
                "destination",
                "name country"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: activities.length,
            activities
        });

    } catch (error) {
        console.error("Get Activities Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch activities",
            error: error.message
        });
    }
};


// ============================================
// GET SINGLE ACTIVITY
// GET /api/activities/:id
// ============================================

const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(
            req.params.id
        ).populate(
            "destination",
            "name country"
        );

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found"
            });
        }

        res.status(200).json({
            success: true,
            activity
        });

    } catch (error) {
        console.error("Get Activity Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch activity",
            error: error.message
        });
    }
};


// ============================================
// GET ACTIVITIES BY DESTINATION
// GET /api/activities/destination/:destinationId
// ============================================

const getActivitiesByDestination = async (req, res) => {
    try {
        const activities = await Activity.find({
            destination: req.params.destinationId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: activities.length,
            activities
        });

    } catch (error) {
        console.error(
            "Get Destination Activities Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch destination activities",
            error: error.message
        });
    }
};


module.exports = {
    createActivity,
    getActivities,
    getActivityById,
    getActivitiesByDestination
};