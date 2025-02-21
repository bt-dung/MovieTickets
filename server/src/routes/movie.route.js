const express = require('express');
const router = express.Router();
const { getMovie, getAllMovies, getFilmNewRelease, searchMovies } = require("../controllers/Movies")

router.get("/movies/newRelease", getFilmNewRelease)
    .get("/movies", getAllMovies)
    .get("/movies/search", searchMovies)
    .get("/movies/:id", getMovie);

module.exports = router;