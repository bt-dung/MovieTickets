const express = require('express');
const router = express.Router();
const { getMovie, getAllMovies, getFilmNewRelease, searchMovies, getDetailsMovie } = require("../controllers/Movies");

router.get("/movies/newRelease", getFilmNewRelease)
    .post("/movies", getAllMovies)
    .get("/movies/search", searchMovies)
    .get("/movies/:id", getMovie)
    .get("/movie/:movieId/details-movie", getDetailsMovie);

module.exports = router;