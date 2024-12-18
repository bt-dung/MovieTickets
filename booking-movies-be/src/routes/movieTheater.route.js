const express = require('express');
const router = express.Router();
const { insertMovie } = require('../controllers/movieTheater');

router.post("/add-movie", insertMovie);

module.exports = router;