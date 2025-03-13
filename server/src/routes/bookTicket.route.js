const express = require('express');
const router = express.Router();
// const BookTicket = require("../controllers/bookTicket");
const makePayment = require("../controllers/bookTicket");
router.post("/create-link-payment", makePayment);

module.exports = router;