const Tickets = require("../models/Tickets");
const TicketController = {
    createTicket: async (req, res) => {
        try {
            const ticketData = req.body;
            const newTicket = await Tickets.createTicket(ticketData);
            return res.json({ status: "SUCCESS", newTicket });
        } catch (error) {
            console.error("Error when create tickets:", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    }
};
module.exports = TicketController;