const Destination = require("../models/Destination");

// =====================================
// SEARCH DESTINATIONS
// =====================================

const searchDestinations = async (req, res) => {
    try {
        const query = req.query.query || "";

        if (!query.trim()) {
            return res.json({
                success: true,
                count: 0,
                destinations: []
            });
        }

        const searchRegex = new RegExp(query.trim(), "i");

        const destinations = await Destination.find({
            $or: [
                { name: searchRegex },
                { city: searchRegex },
                { country: searchRegex },
                { category: searchRegex }
            ]
        }).limit(20);

        res.json({
            success: true,
            count: destinations.length,
            destinations
        });

    } catch (error) {
        console.error("Search Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to search destinations"
        });
    }
};


// =====================================
// GET ALL DESTINATIONS
// =====================================

const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find().limit(50);

        res.json({
            success: true,
            count: destinations.length,
            destinations
        });

    } catch (error) {
        console.error("Get Destinations Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch destinations"
        });
    }
};


// =====================================
// GET POPULAR DESTINATIONS
// =====================================

const getPopularDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find({
            popular: true
        }).limit(20);

        res.json({
            success: true,
            count: destinations.length,
            destinations
        });

    } catch (error) {
        console.error("Popular Destinations Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch popular destinations"
        });
    }
};

// =====================================
// GET SINGLE DESTINATION
// =====================================

const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(
            req.params.id
        );

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }

        res.json({
            success: true,
            destination
        });

    } catch (error) {
        console.error("Get Destination Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch destination"
        });
    }
};
module.exports = {
    searchDestinations,
    getDestinations,
    getPopularDestinations,
    getDestinationById
};