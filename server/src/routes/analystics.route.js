const express = require('express');
const router = express.Router();
const AnalysticsController = require("../controllers/Analystics");

router.get("/analytics/users", AnalysticsController.getUserAnalytics)
    .get("/revenue-analyst", AnalysticsController.getRevenueAnalystInYear)
    .get("/analytics/orders", AnalysticsController.getOrderAnalytics)
    .get("/analytics/revenues", AnalysticsController.getRevenueAnalytics)
    .get("/analytics/tickets", AnalysticsController.getTicketAnalytics)
    .get("/analystics/movies", AnalysticsController.getTheBestMovies);

module.exports = router;