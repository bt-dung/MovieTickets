const express = require('express');
const router = express.Router();
const { getAllTheater, getTheater, createTheater, updateTheater, deleteTheater, searchTheater } = require("../controllers/Theaters")

router.get("/theaters", getAllTheater)
    .get("/theaters/search", searchTheater)
    .get("/theaters/:id", getTheater)
    .patch("/theaters/:id/update", updateTheater)
    .post("/create-theater", createTheater)
    .delete("/theaters/:id/delete", deleteTheater);

module.exports = router;