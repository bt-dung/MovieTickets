const express = require("express");
const router = express.Router();
const {
  ScheduleShowtime,
  getAllShowtimeofTheater,
  getShowtime,
  updateShowtime,
  deleteShowtime,
  getShowtimeofMovieInTheater,
  getShowtimesofMovie,
} = require("../controllers/Showtime");

router
  .post("/insertShowtime", ScheduleShowtime)
  .get("/theater/:theaterId/showtimes/:dateTime", getAllShowtimeofTheater)
  .get("/theater/:theaterId/movie/:movieId/showtimes/:dateTime", getShowtimeofMovieInTheater)
  .get("/movie/:movieId/showtimes/:dateTime", getShowtimesofMovie)
  .get("/showtime/:id", getShowtime)
  .patch("/showtime/:id/update", updateShowtime)
  .delete("/showtime/:id/delete", deleteShowtime);

module.exports = router;
