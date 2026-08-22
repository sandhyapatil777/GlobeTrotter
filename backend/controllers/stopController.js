const Stop = require("../models/Stop");
const Trip = require("../models/Trip");
const Destination = require("../models/Destination");


// ============================================
// ADD STOP TO TRIP
// POST /api/trips/:tripId/stops
// ============================================

const addStop = async (req, res) => {
    try {
        const { tripId } = req.params;

        const {
            destination,
            arrivalDate,
            departureDate,
            order,
            notes
        } = req.body;

        // Check required fields
        if (
            !destination ||
            !arrivalDate ||
            !departureDate ||
            order === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Destination, arrival date, departure date and order are required"
            });
        }

        // Find trip
        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        // Check trip ownership
        if (trip.user.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this trip"
            });
        }

        // Find destination
        const destinationExists =
            await Destination.findById(destination);

        if (!destinationExists) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }

        // Validate dates
        if (
            new Date(departureDate) <=
            new Date(arrivalDate)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Departure date must be after arrival date"
            });
        }

        // Check whether destination is already added
        const existingStop = await Stop.findOne({
            trip: tripId,
            destination: destination
        });

        if (existingStop) {
            return res.status(400).json({
                success: false,
                message:
                    "This destination is already added to the trip"
            });
        }

        // Create stop
        const stop = await Stop.create({
            trip: tripId,
            destination: destination,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            order: order,
            notes: notes || ""
        });

        return res.status(201).json({
            success: true,
            message: "Stop added successfully",
            stop
        });

    } catch (error) {

        console.error("ADD STOP ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to add stop",
            error: error.message
        });
    }
};


// ============================================
// GET ALL STOPS OF A TRIP
// GET /api/trips/:tripId/stops
// ============================================

const getTripStops = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        if (trip.user.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this trip"
            });
        }

        const stops = await Stop.find({
            trip: tripId
        })
            .populate(
                "destination",
                "name country description image costIndex popularity"
            )
            .sort({ order: 1 });

        return res.status(200).json({
            success: true,
            count: stops.length,
            stops
        });

    } catch (error) {

        console.error("GET STOPS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch stops",
            error: error.message
        });
    }
};


// ============================================
// UPDATE STOP
// PUT /api/stops/:stopId
// ============================================

const updateStop = async (req, res) => {
    try {
        const { stopId } = req.params;

        const stop = await Stop.findById(stopId);

        if (!stop) {
            return res.status(404).json({
                success: false,
                message: "Stop not found"
            });
        }

        const trip = await Trip.findById(stop.trip);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        if (trip.user.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this stop"
            });
        }

        const {
            destination,
            arrivalDate,
            departureDate,
            order,
            notes
        } = req.body;

        if (destination) {
            const destinationExists =
                await Destination.findById(destination);

            if (!destinationExists) {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found"
                });
            }

            stop.destination = destination;
        }

        if (arrivalDate) {
            stop.arrivalDate = arrivalDate;
        }

        if (departureDate) {
            stop.departureDate = departureDate;
        }

        if (order !== undefined) {
            stop.order = order;
        }

        if (notes !== undefined) {
            stop.notes = notes;
        }

        if (
            new Date(stop.departureDate) <=
            new Date(stop.arrivalDate)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Departure date must be after arrival date"
            });
        }

        await stop.save();

        return res.status(200).json({
            success: true,
            message: "Stop updated successfully",
            stop
        });

    } catch (error) {

        console.error("UPDATE STOP ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update stop",
            error: error.message
        });
    }
};


// ============================================
// DELETE STOP
// DELETE /api/stops/:stopId
// ============================================

const deleteStop = async (req, res) => {
    try {
        const { stopId } = req.params;

        const stop = await Stop.findById(stopId);

        if (!stop) {
            return res.status(404).json({
                success: false,
                message: "Stop not found"
            });
        }

        const trip = await Trip.findById(stop.trip);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        if (trip.user.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to delete this stop"
            });
        }

        await Stop.findByIdAndDelete(stopId);

        return res.status(200).json({
            success: true,
            message: "Stop deleted successfully"
        });

    } catch (error) {

        console.error("DELETE STOP ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete stop",
            error: error.message
        });
    }
};


module.exports = {
    addStop,
    getTripStops,
    updateStop,
    deleteStop
};