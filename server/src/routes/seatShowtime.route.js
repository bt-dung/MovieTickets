const express = require('express');
const router = express.Router();
const { insertSeatShowtime } = require("../controllers/SeatShowtime")

router.post("/booking-ticket", insertSeatShowtime)
    

module.exports = router;