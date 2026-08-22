const express = require("express");

const router = express.Router();

const {
    searchDestinations,
    getDestinations,
    getPopularDestinations,
    getDestinationById
} = require("../controllers/destinationController");


// Search destinations
router.get("/search", searchDestinations);


// Popular destinations
router.get("/popular", getPopularDestinations);


// Get all destinations
router.get("/", getDestinations);


// Get single destination
router.get("/:id", getDestinationById);


module.exports = router;