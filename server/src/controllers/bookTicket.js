const Invoices = require("../models/Invoices");
const Tickets = require("../models/Tickets");

const BookTicket = async (req, res) => {
    const { user_id, theater_id, seat_id, showtime_id } = req.body;

    if (!user_id || !theater_id || !seat_id || !showtime_id || !Array.isArray(seat_id)) {
        return res.status(400).json({ status: "FAILED", message: "Invalid input data." });
    }

    try {
        const InvoiceData = {
            user_id,
            theater_id,
        };
        const newInvoice = await Invoices.createInvoice(InvoiceData);

        if (!newInvoice || !newInvoice.id) {
            throw new Error("Failed to create invoice.");
        }

        const ticketPromises = seat_id.map(async (seatId) => {
            const ticketData = {
                invoice_id: newInvoice.id,
                seat_id: seatId,
                showtime_id,
            };
            return await Tickets.createTicket(ticketData);
        });

        const createdTickets = await Promise.all(ticketPromises);

        if (!createdTickets || createdTickets.length !== seat_id.length) {
            throw new Error("Failed to create one or more tickets.");
        }
        const invoice = await Invoices.findByPk(newInvoice.id);
        return res.status(201).json({
            status: "SUCCESS",
            message: "Ticket booked successfully.",
            invoice: invoice,
            tickets: createdTickets,
        });
    } catch (error) {
        console.error("Error when booking tickets:", error);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};

module.exports = BookTicket;
