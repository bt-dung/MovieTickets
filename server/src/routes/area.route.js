const express = require('express');
const router = express.Router();
const { getArea } = require("../controllers/Area")

router.get("/areas", getArea);

module.exports = router;