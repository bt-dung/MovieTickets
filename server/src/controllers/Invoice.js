const Invoices = require("../models/Invoices");
const Tickets = require("../models/Tickets");
const InvoiceController = {
    createInvoice: async (req, res) => {
        try {
            const invoiceData = req.body;
            const newInvoice = await Invoices.createInvoice(invoiceData);
            return res.json(newInvoice);
        } catch (error) {
            console.error("Error when create invoice:", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        };
    },

    getAllInvoicebyTheater: async (req, res) => {
        const { theaterId, dateTime } = req.params;
        const page = parseInt(req.query.pageNumber);
        const limit = parseInt(req.query.limit);
        const date = new Date(dateTime);

        const formattedDateTime = date.toLocaleDateString('en-CA');
        try {
            const { invoices, totalInvoice } = await Invoices.getAllInvoicebyTheater(theaterId, formattedDateTime, page, limit);
            const totalPages = Math.ceil(totalInvoice / limit);

            return res.status(200).json({
                status: "SUCCESS", data: invoices, totalPages: totalPages
            });
        } catch (error) {
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },

    getInvoiceById: async (req, res) => {
        const { id } = req.params;
        try {
            const invoice = await Invoices.fetchInvoicebyId(id);
            return res.json(invoice);
        } catch (error) {
            console.error("Fetching invoice error:", error);
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },

    getInvoiceByUser: async (req, res) => {
        const { userId } = req.params;
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        }
        try {
            const invoices = await Invoices.fetchInvoiceByUser(userId);
            const groupedInvoices = invoices.reduce((acc, invoice) => {
                const date = formatDate(invoice.purchase_date);
                console.log(date);

                if (!acc[date]) {
                    acc[date] = [];
                }

                acc[date].push(invoice.dataValues);

                return acc;
            }, {});
            return res.json(groupedInvoices);
        } catch (error) {
            console.error("Error when get invoices of user:", error);
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },
    // updateInvoice: async (req, res) => {
    //     const { id } = req.params;
    //     const { seat_id, showtime_id, PaymentStatus } = req.body;
    //     if (!seat_id || !showtime_id || !PaymentStatus) {
    //         return res.status(400).json({ status: "FAILED", message: 'All fields are required!!' });
    //     }
    //     const updateTicket = {
    //         seat_id,
    //         showtime_id
    //     };
    //     const updateInvoice = {
    //         PaymentStatus
    //     }
    //     try {
    //         const updatedTicket = await Tickets.updatedTicket(id, updateTicket);
    //         if (updatedTicket) {
    //             const updatedInvoice = await Invoices.updateInvoice(id, updateInvoice);
    //             return res.status(200).json({ status: "SUCCESS", message: 'Ticket updated successfully', data: updatedShowtime });
    //         }
    //         const updatedInvoice = await Invoices.updateInvoice(id, updateInvoice);
    //         return res.status(200).json({ status: "SUCCESS", message: ' updated successfully', data: updatedShowtime });
    //     } catch (error) {
    //         return res.status(400).json({ status: "FAILED", message: error.message });
    //     }
    // },
    updateInvoice: async (req, res) => {
        const { data } = req.body;
        try {

        } catch (error) {
            console.log("Error while update invoice:", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    deleteInvoice: async (req, res) => {
        const { id } = req.params;
        try {
            await Invoices.deleteInvoice(id);
            return res.status(200).json({ status: "SUCCESS", message: 'Invoice deleted successfully' });
        } catch (error) {
            console.error("Error while delete invoice: ", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    }
};

module.exports = InvoiceController;