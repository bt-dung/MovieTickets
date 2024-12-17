const express = require('express');
const router = express.Router();
const { getMovie, getAllMovies } = require("../controllers/Movies")

router.get("/movies", getAllMovies)
    .get("/movies/:id", getMovie);