const express = require("express");
const router = express.Router();
const ScheduleShowtime = require("../controllers/Showtime");

router
  .post("/insertShowtime/", ScheduleShowtime)
  .get("/showtimes/:theaterId/:dateTime", getShowtime)
module.exports = router;
