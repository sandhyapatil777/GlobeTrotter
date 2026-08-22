const Trip = require("../models/Trip");
const ItineraryActivity = require("../models/ItineraryActivity");
const Expense = require("../models/Expense");

// ============================================
// GET TRIP BUDGET BREAKDOWN
// GET /api/trips/:tripId/budget
// ============================================

const getTripBudget = async (req, res) => {
    try {
        const { tripId } = req.params;

        // ========================================
        // FIND TRIP
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
            }).populate("activity");

        // ========================================
        // CALCULATE ACTIVITY COST
        // ========================================

        const activityCost =
            itineraryActivities.reduce(
                (total, item) => {
                    return total +
                        (Number(item.activity?.cost) || 0);
                },
                0
            );

        // ========================================
        // GET EXPENSES
        // ========================================

        const expenses = await Expense.find({
            trip: tripId
        });

        // ========================================
        // CALCULATE EXPENSE CATEGORIES
        // ========================================

        let transportCost = 0;
        let stayCost = 0;
        let mealsCost = 0;
        let otherCost = 0;

        expenses.forEach((expense) => {

            const amount =
                Number(expense.amount) || 0;

            switch (expense.category) {

                case "transport":
                    transportCost += amount;
                    break;

                case "stay":
                    stayCost += amount;
                    break;

                case "meals":
                    mealsCost += amount;
                    break;

                case "activities":
                    // Activity expenses entered manually
                    // are added here.
                    break;

                case "other":
                    otherCost += amount;
                    break;
            }
        });

        // ========================================
        // TOTAL ACTIVITY COST
        // ========================================

        const totalActivityCost =
            activityCost +
            expenses
                .filter(
                    (expense) =>
                        expense.category === "activities"
                )
                .reduce(
                    (total, expense) =>
                        total +
                        (Number(expense.amount) || 0),
                    0
                );

        // ========================================
        // TOTAL ESTIMATED COST
        // ========================================

        const totalEstimatedCost =
            transportCost +
            stayCost +
            mealsCost +
            totalActivityCost +
            otherCost;

        // ========================================
        // REMAINING BUDGET
        // ========================================

        const plannedBudget =
            Number(trip.budget || 0);

        const remainingBudget =
            plannedBudget -
            totalEstimatedCost;

        // ========================================
        // TRIP DAYS
        // ========================================

        const startDate =
            new Date(trip.startDate);

        const endDate =
            new Date(trip.endDate);

        const difference =
            endDate.getTime() -
            startDate.getTime();

        const numberOfDays =
            Math.max(
                1,
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                )
            );

        // ========================================
        // AVERAGE COST PER DAY
        // ========================================

        const averageCostPerDay =
            totalEstimatedCost /
            numberOfDays;

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success: true,

            budget: {

                plannedBudget,

                breakdown: {

                    transport:
                        transportCost,

                    stay:
                        stayCost,

                    meals:
                        mealsCost,

                    activities:
                        totalActivityCost,

                    other:
                        otherCost
                },

                totalEstimatedCost,

                remainingBudget,

                averageCostPerDay:
                    Number(
                        averageCostPerDay.toFixed(2)
                    ),

                numberOfDays,

                overBudget:
                    totalEstimatedCost >
                    plannedBudget
            }
        });

    } catch (error) {

        console.error(
            "Get Trip Budget Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to calculate trip budget",
            error: error.message
        });
    }
};

module.exports = {
    getTripBudget
};