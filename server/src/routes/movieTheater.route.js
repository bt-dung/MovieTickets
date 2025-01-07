const express = require('express');
const router = express.Router();
const { insertMovie, getMoviesInTheater, deleteMoveinTheater } = require('../controllers/movieTheater');

router.post("/movies-theater/add-movie", insertMovie)
    .get("/movies-theater/:theaterId", getMoviesInTheater)
    .delete("/movies-theater/delete", deleteMoveinTheater);

module.exports = router;