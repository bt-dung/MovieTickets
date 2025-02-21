const Invoices = require("../models/Invoices");
const Tickets = require("../models/Tickets");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
    logger: true
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for message")
        console.log(success);
    }
})

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
const sendTicketEmail = async ({ id, email }, res) => {
    try {
        console.log("Email user:", email);
        const currentUrl = "http://localhost:5000/";
        const uniqueString = uuidv4() + id;

        const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

        const newVerification = new UserVerification({
            user_id: id,
            uniqueString: hashedUniqueString,
            createAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });

        await newVerification.save();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `
                <p>Verify your email address to complete the signup and login into your account.</p>
                <p>This link <b>expires in 6 hours</b>.</p>
                <p>Press <a href=${currentUrl + "user/verify/" + id + "/" + uniqueString}>here</a> to proceed.</p>.`,
        };

        const sentEmail = await transporter.sendMail(mailOptions);
        return sentEmail;

    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};
module.exports = BookTicket;
