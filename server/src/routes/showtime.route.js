const express = require("express");
const router = express.Router();
const {
  ScheduleShowtime,
  getAllShowtimeofTheater,
  getShowtime,
  updateShowtime,
  deleteShowtime,
} = require("../controllers/Showtime");

router
  .post("/insertShowtime", ScheduleShowtime)
  .get("/showtimes/:theaterId/:dateTime", getAllShowtimeofTheater)
  .get("/showtime/:id", getShowtime)
  .patch("/showtime/:id/update", updateShowtime)
  .delete("/showtime/:id/delete", deleteShowtime);
module.exports = router;
