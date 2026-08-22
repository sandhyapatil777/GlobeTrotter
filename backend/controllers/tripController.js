// Trip controller placeholder.
const Trip = require("../models/Trip");


// =====================================
// CREATE TRIP
// =====================================

const createTrip = async (req, res) => {
    try {

        const {
            tripName,
            destination,
            startDate,
            endDate,
            description,
            budget,
            places,
            activities,
            notes
        } = req.body;


        if (
            !tripName ||
            !destination ||
            !startDate ||
            !endDate
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Trip name, destination, start date and end date are required"
            });
        }


        if (
            new Date(endDate) <
            new Date(startDate)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "End date cannot be before start date"
            });
        }


        const trip = await Trip.create({
            user: req.userId,
            tripName,
            destination,
            startDate,
            endDate,
            description,
            budget,
            places,
            activities,
            notes
        });


        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip
        });

    } catch (error) {

        console.error("Create Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create trip"
        });
    }
};


// =====================================
// GET MY TRIPS
// =====================================

const getMyTrips = async (req, res) => {
    try {

        const trips = await Trip.find({
            user: req.userId
        }).sort({
            createdAt: -1
        });


        res.status(200).json({
            success: true,
            count: trips.length,
            trips
        });

    } catch (error) {

        console.error("Get Trips Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch trips"
        });
    }
};


// =====================================
// GET SINGLE TRIP
// =====================================

const getTripById = async (req, res) => {
    try {

        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.userId
        });


        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }


        res.status(200).json({
            success: true,
            trip
        });

    } catch (error) {

        console.error("Get Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch trip"
        });
    }
};


// =====================================
// UPDATE TRIP
// =====================================

const updateTrip = async (req, res) => {
    try {

        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.userId
        });


        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }


        const allowedFields = [
            "tripName",
            "destination",
            "startDate",
            "endDate",
            "description",
            "budget",
            "places",
            "activities",
            "notes",
            "status"
        ];


        allowedFields.forEach((field) => {

            if (req.body[field] !== undefined) {
                trip[field] = req.body[field];
            }

        });


        if (
            new Date(trip.endDate) <
            new Date(trip.startDate)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "End date cannot be before start date"
            });
        }


        await trip.save();


        res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            trip
        });

    } catch (error) {

        console.error("Update Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to update trip"
        });
    }
};


// =====================================
// DELETE TRIP
// =====================================

const deleteTrip = async (req, res) => {
    try {

        const trip =
            await Trip.findOneAndDelete({
                _id: req.params.id,
                user: req.userId
            });


        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Trip deleted successfully"
        });

    } catch (error) {

        console.error("Delete Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to delete trip"
        });
    }
};


// =====================================
// EXPORT CONTROLLERS
// =====================================

module.exports = {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip
};