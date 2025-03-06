const Invoices = require("../models/Invoices");
const Tickets = require("../models/Tickets");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const QRCode = require('qrcode');
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

    if (!user_id || !theater_id || !seat_id || !showtime_id || !Array.isArray(seat_id) || seat_id.length === 0) {
        return res.status(400).json({ status: "FAILED", message: "Invalid input data." });
    }

    try {
        const InvoiceData = {
            user_id,
            theater_id,
        };
        const { user, newInvoice } = await Invoices.createInvoice(InvoiceData);
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
        // const sentEmail = sendTicketEmail(user.email, createdTickets);
        if (!createdTickets || createdTickets.length !== seat_id.length) {

            try {
                await Invoices.update(
                    { status: 'Cancelled' },
                    { where: { id: newInvoice.id } }
                );
                throw new Error("Failed to create one or more tickets. Invoice has been cancelled.");
            } catch (updateError) {
                console.error("Error updating invoice status:", updateError);
                throw updateError;
            }
        }
        // if (sentEmail) {
        //     console.log("Email sending successful!!")
        // }
        const invoice = await Invoices.findByPk(newInvoice.id);
        return res.status(201).json({
            status: "SUCCESS",
            message: "Tickets have been booked successfully! Check ticket sent email.",
            invoice: invoice,
            tickets: createdTickets,
        });
    } catch (error) {
        console.error("Error when booking tickets:", error);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};
const generateOrderCode = (email, timestamp) => {
    return crypto.createHash('md5')
        .update(`${email}-${timestamp}`)
        .digest('hex')
        .slice(0, 10)
};
const sendTicketEmail = async ({ email, ticketInfo }) => {
    try {
        console.log("Gửi email đến:", email);
        const timestamp = Date.now();
        const orderCode = generateOrderCode(userId, timestamp);
        const qrData = ticketInfo.map((ticket, index) => (
            `Ticket ${index + 1}:\n` +
            `Ticket Code: ${ticket.id}\n` +
            `Movie: ${ticketInfo.titleMovie}\n` +
            `Seat: ${ticketInfo.seat}\n` +
            `Date: ${ticketInfo.showDate}\n` +
            `Showtime: ${ticketInfo.showTime}\n`
        )).join('\n');
        const qrCodeImage = await QRCode.toDataURL(qrData);

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: `🎟️ Vé Xem Phim - ${ticketInfo.movieName}`,
            html: `
                <div style="max-width:600px; margin:0 auto; padding:20px; border:1px solid #ddd; border-radius:10px; font-family:Arial, sans-serif; background-color:#f9f9f9;">
                    <h2 style="text-align:center; color:#e50914;">🎬 Xác Nhận Đặt Vé</h2>
                    <p style="font-size:16px;">Cảm ơn bạn đã đặt vé! Dưới đây là thông tin vé của bạn:</p>

                    <div style="padding:15px; border:1px solid #ccc; border-radius:8px; background-color:#fff;">
                        <p><strong>Mã Vé:</strong> ${ticketInfo.ticketCode}</p>
                        <p><strong>Phim:</strong> ${ticketInfo.movieName}</p>
                        <p><strong>Ngày Chiếu:</strong> ${ticketInfo.showDate}</p>
                        <p><strong>Giờ Chiếu:</strong> ${ticketInfo.showTime}</p>
                        <p><strong>Ghế:</strong> ${ticketInfo.seat}</p>
                    </div>

                    <p style="margin-top:20px;">Vui lòng xuất trình mã QR dưới đây khi vào rạp:</p>
                    <div style="text-align:center; margin-top:10px;">
                        <img src="${qrCodeImage}" alt="QR Code" width="200" style="border:1px solid #ccc; padding:5px; border-radius:8px;"/>
                    </div>

                    <p style="text-align:center; margin-top:20px; font-size:14px; color:#777;">🎞️ Chúc bạn có một buổi xem phim vui vẻ!</p>
                </div>
            `,
        };

        const sentEmail = await transporter.sendMail(mailOptions);
        console.log("✅ Email xác nhận vé đã được gửi!");
        return sentEmail;

    } catch (error) {
        console.error("❌ Lỗi khi gửi email:", error.message);
        throw error;
    }
}
module.exports = BookTicket;
