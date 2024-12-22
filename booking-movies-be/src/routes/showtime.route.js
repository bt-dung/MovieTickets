const express = require('express');
const router = express.Router();
const ScheduleShowtime = require('../controllers/Showtime');

router.post("/insertShowtime", ScheduleShowtime);
module.exports = router;
