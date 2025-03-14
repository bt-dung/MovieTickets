const express = require('express');
const router = express.Router();
const { makePayment, getPaymentStatus } = require("../controllers/bookTicket");
router.post("/create-link-payment", makePayment)
    .post("/receive-hook", getPaymentStatus);

module.exports = router;