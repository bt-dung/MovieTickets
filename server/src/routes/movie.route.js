const express = require('express');
const router = express.Router();
const { getMovie, getAllMovies, getFilmNewRelease } = require("../controllers/Movies")

router.get("/movies/newRelease", getFilmNewRelease)
    .get("/movies", getAllMovies)
    .get("/movies/:id", getMovie);

module.exports = router;