const express = require('express');
const router = express.Router();
const GenreController = require("../controllers/Genre");

router.get("/genres", GenreController.getAllGenre);

module.exports = router;
