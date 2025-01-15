const express = require("express");
const router = express.Router();
const SeatController = require("../controllers/Seats");

router.get("/seats/:screenId", SeatController.getSeatbyScreen);

module.exports = router;