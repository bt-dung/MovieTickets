const express = require('express');
const router = express.Router();
const TicketController = require("../controllers/Tickets");

router.post("/createTicket", TicketController.createTicket);

module.exports = router;