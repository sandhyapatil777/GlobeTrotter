const crypto = require("crypto");

const Share = require("../models/Share");
const Trip = require("../models/Trip");
const Stop = require("../models/Stop");
const ItineraryActivity = require("../models/ItineraryActivity");

// ============================================
// CREATE SHARE LINK
// POST /api/trips/:tripId/share
// ============================================

const createShareLink = async (req, res) => {
    try {
        const { tripId } = req.params;

        // Find trip belonging to logged-in user
        const trip = await Trip.findOne({
            _id: tripId,
            user: req.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Check if an active public share already exists
        const existingShare = await Share.findOne({
            trip: tripId,
            user: req.userId,
            isPublic: true
        });

        if (existingShare) {
            return res.status(200).json({
                success: true,
                message: "Share link already exists",
                share: existingShare
            });
        }

        // Generate unique share ID
        const shareId = crypto
            .randomBytes(16)
            .toString("hex");

        const share = await Share.create({
            trip: tripId,
            user: req.userId,
            shareId,
            isPublic: true
        });

        res.status(201).json({
            success: true,
            message: "Share link created successfully",
            share
        });

    } catch (error) {
        console.error(
            "Create Share Link Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to create share link",
            error: error.message
        });
    }
};

// ============================================
// GET PUBLIC SHARED ITINERARY
// GET /api/shared/:shareId
// ============================================

const getSharedItinerary = async (req, res) => {
    try {
        const { shareId } = req.params;

        const share = await Share.findOne({
            shareId,
            isPublic: true
        });

        if (!share) {
            return res.status(404).json({
                success: false,
                message: "Shared itinerary not found"
            });
        }

        // Check expiration
        if (
            share.expiresAt &&
            new Date() > new Date(share.expiresAt)
        ) {
            return res.status(410).json({
                success: false,
                message: "This share link has expired"
            });
        }

        // Find trip
        const trip = await Trip.findById(
            share.trip
        );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Get itinerary activities
        const activities =
            await ItineraryActivity.find({
                trip: trip._id
            })
                .populate("activity")
                .populate("stop");

        res.status(200).json({
            success: true,

            trip: {
                id: trip._id,
                name: trip.tripName,
                destination: trip.destination,
                startDate: trip.startDate,
                endDate: trip.endDate,
                description: trip.description,
                budget: trip.budget
            },

            activities
        });

    } catch (error) {
        console.error(
            "Get Shared Itinerary Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to fetch shared itinerary",
            error: error.message
        });
    }
};

// ============================================
// DISABLE SHARE LINK
// DELETE /api/trips/:tripId/share
// ============================================

const disableShareLink = async (req, res) => {
    try {
        const { tripId } = req.params;

        const share = await Share.findOne({
            trip: tripId,
            user: req.userId,
            isPublic: true
        });

        if (!share) {
            return res.status(404).json({
                success: false,
                message: "Active share link not found"
            });
        }

        share.isPublic = false;

        await share.save();

        res.status(200).json({
            success: true,
            message: "Share link disabled successfully"
        });

    } catch (error) {
        console.error(
            "Disable Share Link Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to disable share link",
            error: error.message
        });
    }
};

// ============================================
// COPY SHARED TRIP
// POST /api/shared/:shareId/copy
// ============================================

const copySharedTrip = async (req, res) => {
    try {
        const { shareId } = req.params;

        // ========================================
        // AUTHENTICATION CHECK
        // ========================================

        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // ========================================
        // FIND PUBLIC SHARE
        // ========================================

        const share = await Share.findOne({
            shareId,
            isPublic: true
        });

        if (!share) {
            return res.status(404).json({
                success: false,
                message: "Shared itinerary not found"
            });
        }

        // ========================================
        // CHECK EXPIRATION
        // ========================================

        if (
            share.expiresAt &&
            new Date() > new Date(share.expiresAt)
        ) {
            return res.status(410).json({
                success: false,
                message: "This share link has expired"
            });
        }

        // ========================================
        // FIND ORIGINAL TRIP
        // ========================================

        const originalTrip = await Trip.findById(
            share.trip
        );

        if (!originalTrip) {
            return res.status(404).json({
                success: false,
                message: "Original trip not found"
            });
        }

        // ========================================
        // CREATE COPIED TRIP
        // ========================================

        const copiedTrip = await Trip.create({
            user: req.userId,

            tripName:
    originalTrip.tripName + " - Copy",

            destination:
                originalTrip.destination,

            startDate:
                originalTrip.startDate,

            endDate:
                originalTrip.endDate,

            description:
                originalTrip.description,

            budget:
                originalTrip.budget,

            places:
                originalTrip.places,

            activities:
                originalTrip.activities,

            notes:
                originalTrip.notes,

            status: "planned"
        });

        // ========================================
        // FIND ORIGINAL STOPS
        // ========================================

        const originalStops = await Stop.find({
            trip: originalTrip._id
        }).sort({
            order: 1
        });

        // ========================================
        // COPY STOPS
        // ========================================

        const stopIdMap = new Map();

        for (const originalStop of originalStops) {

            const copiedStop = await Stop.create({

                trip:
                    copiedTrip._id,

                destination:
                    originalStop.destination,

                arrivalDate:
                    originalStop.arrivalDate,

                departureDate:
                    originalStop.departureDate,

                order:
                    originalStop.order,

                notes:
                    originalStop.notes
            });

            stopIdMap.set(
                originalStop._id.toString(),
                copiedStop._id
            );
        }

        // ========================================
        // FIND ORIGINAL ITINERARY ACTIVITIES
        // ========================================

        const originalActivities =
            await ItineraryActivity.find({
                trip: originalTrip._id
            }).sort({
                order: 1
            });

        // ========================================
        // COPY ITINERARY ACTIVITIES
        // ========================================

        for (
            const originalActivity
            of originalActivities
        ) {

            const originalStopId =
                originalActivity.stop
                    ? originalActivity.stop.toString()
                    : null;

            const newStopId =
                originalStopId
                    ? stopIdMap.get(originalStopId)
                    : null;

            // Skip activity if its stop
            // could not be copied
            if (!newStopId) {
                continue;
            }

            await ItineraryActivity.create({

                trip:
                    copiedTrip._id,

                stop:
                    newStopId,

                activity:
                    originalActivity.activity,

                date:
                    originalActivity.date,

                startTime:
                    originalActivity.startTime,

                endTime:
                    originalActivity.endTime,

                notes:
                    originalActivity.notes,

                order:
                    originalActivity.order
            });
        }

        // ========================================
        // RESPONSE
        // ========================================

        res.status(201).json({

            success: true,

            message:
                "Trip copied successfully",

            trip: copiedTrip

        });

    } catch (error) {

        console.error(
            "Copy Shared Trip Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to copy shared trip",

            error: error.message

        });
    }
};

// ============================================
// EXPORT CONTROLLERS
// ============================================

module.exports = {

    createShareLink,

    getSharedItinerary,

    disableShareLink,

    copySharedTrip

};

