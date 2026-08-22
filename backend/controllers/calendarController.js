const Trip = require("../models/Trip");
const ItineraryActivity = require("../models/ItineraryActivity");

// ============================================
// GET TRIP CALENDAR / TIMELINE
// GET /api/trips/:tripId/calendar
// ============================================

const getTripCalendar = async (req, res) => {
    try {
        const { tripId } = req.params;

        // ========================================
        // FIND TRIP BELONGING TO LOGGED-IN USER
        // ========================================

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

        // ========================================
        // GET ITINERARY ACTIVITIES
        // ========================================

        const itineraryActivities =
            await ItineraryActivity.find({
                trip: tripId
            })
                .populate("activity")
                .populate("stop");

        // ========================================
        // CREATE DAY-WISE CALENDAR
        // ========================================

        const calendar = {};

        itineraryActivities.forEach((item) => {

            if (!item.date) {
                return;
            }

            const date = new Date(item.date)
                .toISOString()
                .split("T")[0];

            if (!calendar[date]) {
                calendar[date] = [];
            }

            calendar[date].push({
                itineraryActivityId: item._id,

                activityId:
                    item.activity?._id || null,

                name:
                    item.activity?.name || "",

                type:
                    item.activity?.type || "",

                description:
                    item.activity?.description || "",

                cost:
                    Number(item.activity?.cost) || 0,

                duration:
                    Number(item.activity?.duration) || 0,

                startTime:
                    item.startTime || "",

                endTime:
                    item.endTime || "",

                notes:
                    item.notes || "",

                stopId:
                    item.stop?._id || null,

                destination:
                    item.stop?.destination || null,

                order:
                    item.order || 0
            });
        });

        // ========================================
        // SORT ACTIVITIES BY START TIME
        // ========================================

        Object.keys(calendar).forEach((date) => {

            calendar[date].sort((a, b) => {

                if (!a.startTime) return 1;
                if (!b.startTime) return -1;

                return a.startTime.localeCompare(
                    b.startTime
                );
            });
        });

        // ========================================
        // CONVERT OBJECT TO ARRAY
        // ========================================

        const days = Object.keys(calendar)
            .sort()
            .map((date) => {

                return {
                    date,
                    activities: calendar[date]
                };
            });

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({
            success: true,

            trip: {
                id: trip._id,
                name: trip.tripName,
                startDate: trip.startDate,
                endDate: trip.endDate
            },

            days
        });

    } catch (error) {

        console.error(
            "Get Trip Calendar Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to fetch trip calendar",
            error: error.message
        });
    }
};

module.exports = {
    getTripCalendar
};