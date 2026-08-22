const ItineraryActivity = require("../models/ItineraryActivity");
const Trip = require("../models/Trip");
const Stop = require("../models/Stop");
const Activity = require("../models/Activity");


// ============================================
// ADD ACTIVITY TO ITINERARY
// POST /api/trips/:tripId/stops/:stopId/activities
// ============================================

const addActivityToItinerary = async (req, res) => {
    try {
        const { tripId, stopId } = req.params;

        const {
            activity,
            date,
            startTime,
            endTime,
            notes,
            order
        } = req.body;

        // -----------------------------
        // Validate required fields
        // -----------------------------

        if (!activity || !date) {
            return res.status(400).json({
                success: false,
                message: "Activity and date are required"
            });
        }

        // -----------------------------
        // Find trip
        // -----------------------------

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // -----------------------------
        // Check trip ownership
        // -----------------------------

        if (
            trip.user.toString() !==
            req.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to modify this trip"
            });
        }

        // -----------------------------
        // Find stop
        // -----------------------------

        const stop = await Stop.findById(stopId);

        if (!stop) {
            return res.status(404).json({
                success: false,
                message: "Stop not found"
            });
        }

        // Make sure stop belongs to this trip
        if (
            stop.trip.toString() !==
            tripId.toString()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "This stop does not belong to this trip"
            });
        }

        // -----------------------------
        // Find activity
        // -----------------------------

        const activityExists =
            await Activity.findById(activity);

        if (!activityExists) {
            return res.status(404).json({
                success: false,
                message: "Activity not found"
            });
        }

        // -----------------------------
        // Check duplicate activity
        // -----------------------------

        const existing =
            await ItineraryActivity.findOne({
                trip: tripId,
                stop: stopId,
                activity: activity,
                date: date
            });

        if (existing) {
            return res.status(400).json({
                success: false,
                message:
                    "This activity is already added to this itinerary"
            });
        }

        // -----------------------------
        // Create itinerary activity
        // -----------------------------

        const itineraryActivity =
            await ItineraryActivity.create({
                trip: tripId,
                stop: stopId,
                activity: activity,
                date,
                startTime: startTime || "",
                endTime: endTime || "",
                notes: notes || "",
                order: order || 0
            });

        // Populate activity and destination
        const populated =
            await ItineraryActivity.findById(
                itineraryActivity._id
            )
                .populate(
                    "activity",
                    "name type description cost duration image popularity"
                )
                .populate(
                    "stop",
                    "arrivalDate departureDate"
                );

        return res.status(201).json({
            success: true,
            message:
                "Activity added to itinerary successfully",
            itineraryActivity: populated
        });

    } catch (error) {

        console.error(
            "ADD ITINERARY ACTIVITY ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to add activity to itinerary",
            error: error.message
        });
    }
};


// ============================================
// GET ACTIVITIES OF A TRIP
// GET /api/trips/:tripId/itinerary-activities
// ============================================

const getTripItineraryActivities = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Check ownership
        if (
            trip.user.toString() !==
            req.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to view this trip"
            });
        }

        const activities =
            await ItineraryActivity.find({
                trip: tripId
            })
                .populate(
                    "activity",
                    "name type description cost duration image popularity"
                )
                .populate(
                    "stop",
                    "destination arrivalDate departureDate order"
                )
                .sort({
                    date: 1,
                    order: 1
                });

        return res.status(200).json({
            success: true,
            count: activities.length,
            activities
        });

    } catch (error) {

        console.error(
            "GET ITINERARY ACTIVITIES ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch itinerary activities",
            error: error.message
        });
    }
};


// ============================================
// UPDATE ITINERARY ACTIVITY
// PUT /api/itinerary-activities/:id
// ============================================

const updateItineraryActivity = async (req, res) => {
    try {
        const itineraryActivity =
            await ItineraryActivity.findById(
                req.params.id
            );

        if (!itineraryActivity) {
            return res.status(404).json({
                success: false,
                message:
                    "Itinerary activity not found"
            });
        }

        const trip =
            await Trip.findById(
                itineraryActivity.trip
            );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Check ownership
        if (
            trip.user.toString() !==
            req.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to modify this activity"
            });
        }

        const allowedFields = [
            "date",
            "startTime",
            "endTime",
            "notes",
            "order"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                itineraryActivity[field] =
                    req.body[field];
            }
        });

        await itineraryActivity.save();

        const updated =
            await ItineraryActivity.findById(
                itineraryActivity._id
            )
                .populate(
                    "activity",
                    "name type description cost duration image popularity"
                )
                .populate(
                    "stop",
                    "destination arrivalDate departureDate order"
                );

        return res.status(200).json({
            success: true,
            message:
                "Itinerary activity updated successfully",
            itineraryActivity: updated
        });

    } catch (error) {

        console.error(
            "UPDATE ITINERARY ACTIVITY ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to update itinerary activity",
            error: error.message
        });
    }
};


// ============================================
// DELETE ITINERARY ACTIVITY
// DELETE /api/itinerary-activities/:id
// ============================================

const deleteItineraryActivity = async (req, res) => {
    try {
        const itineraryActivity =
            await ItineraryActivity.findById(
                req.params.id
            );

        if (!itineraryActivity) {
            return res.status(404).json({
                success: false,
                message:
                    "Itinerary activity not found"
            });
        }

        const trip =
            await Trip.findById(
                itineraryActivity.trip
            );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Check ownership
        if (
            trip.user.toString() !==
            req.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to delete this activity"
            });
        }

        await ItineraryActivity.findByIdAndDelete(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message:
                "Itinerary activity deleted successfully"
        });

    } catch (error) {

        console.error(
            "DELETE ITINERARY ACTIVITY ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to delete itinerary activity",
            error: error.message
        });
    }
};


// ============================================
// EXPORT
// ============================================

module.exports = {
    addActivityToItinerary,
    getTripItineraryActivities,
    updateItineraryActivity,
    deleteItineraryActivity
};