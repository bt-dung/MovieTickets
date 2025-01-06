const express = require('express');
const router = express.Router();
const { getTheater, createTheater } = require("../controllers/Theaters")

router.get("/theaters", getTheater)
    .post("/create-theater", createTheater);

module.exports = router;