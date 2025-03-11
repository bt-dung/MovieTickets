const express = require("express");
const router = express.Router();
const SeatController = require("../controllers/Seats");

router.post("/seat", SeatController.getSeatbyID)
    .get("/seats/:screenId", SeatController.getSeatbyScreen);

module.exports = router;