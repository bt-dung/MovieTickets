const express = require("express");
const { makePayment, getPaymentStatus } = require("../controllers/bookTicket");

module.exports = () => {
    const router = express.Router();

    router.post("/create-link-payment", makePayment);
    router.post("/receive-hook", getPaymentStatus);

    return router;
};
