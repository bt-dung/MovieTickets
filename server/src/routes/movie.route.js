const express = require('express');
const router = express.Router();
const { getDetailsMovie } = require("../controllers/detailMovie");
const { getMovie, getAllMovies, getFilmNewRelease, searchMovies } = require("../controllers/Movies");

router.get("/movies/newRelease", getFilmNewRelease)
    .get("/movies", getAllMovies)
    .get("/movies/search", searchMovies)
    .get("/movies/:id", getMovie)
    .get("/movie/:movieId/details-movie", getDetailsMovie);

module.exports = router;