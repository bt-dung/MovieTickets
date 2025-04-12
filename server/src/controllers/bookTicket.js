const Invoices = require("../models/Invoices");
const Tickets = require("../models/Tickets");
const InvoiceService = require("../models/InvoiceService");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const QRCode = require('qrcode');
const dotenv = require('dotenv');
const PayOs = require('@payos/node');
const FormatDate = require('../config/formatDate');

dotenv.config();

const payos = new PayOs(process.env.CLIENT_ID, process.env.API_KEY, process.env.CHECKSUM_KEY);

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
const makePayment = async (req, res) => {
    const { invoice_id, selectedSeatsID, selectedProducts, showtime_id, totalAmount, url_return, url_cancel } = req.body;
    if (!invoice_id || !selectedSeatsID || !Array.isArray(selectedSeatsID) || selectedSeatsID.length === 0 || !showtime_id || !totalAmount || !url_return || !url_cancel) {
        return res.status(400).json({ status: "FAILED", message: "Invalid input data." });
    }
    try {
        const invoice = await Invoices.fetchInvoicebyId(invoice_id);
        const ticketPromises = selectedSeatsID.map(async (seatId) => {
            const ticketData = {
                invoice_id: invoice.id,
                seat_id: seatId,
                showtime_id,
            };
            try {
                return await Tickets.createTicket(ticketData);
            } catch (error) {
                console.error(`Error creating ticket for seat ${seatId}:`, error);
                throw new Error(`Error creating ticket for seat ${seatId}`);
            }
        });

        const createdTickets = await Promise.allSettled(ticketPromises);

        const servicePromises = selectedProducts.map(async (product) => {
            const servicetData = {
                invoice_id: invoice.id,
                service_id: product.id,
                quantity: product.quantity,
                total_price: product.total_price
            };
            try {
                return await InvoiceService.createServiceInvoice(servicetData);
            } catch (error) {
                console.error(`Error creating service for product ${product.id}:`, error);
                throw new Error(`Error creating service for product ${product.id}`);
            }
        });

        const createdServices = await Promise.allSettled(servicePromises);
        const failedTicketPromises = createdTickets.filter(ticket => ticket.status === 'rejected');
        const failedServicePromises = createdServices.filter(service => service.status === 'rejected');

        if (failedTicketPromises.length > 0 || failedServicePromises.length > 0) {
            try {
                await Invoices.updateInvoice(invoice.id, { PaymentStatus: "Cancelled" });
                console.log("Invoice has been cancelled due to failed ticket or service creation.");
                throw new Error("Failed to create one or more tickets or services. Invoice has been cancelled.");
            } catch (updateError) {
                console.error("Error updating invoice status:", updateError);
                throw updateError;
            }
        } else {
            console.log("Created ticket and service successful!!");
        }
        // const orderCode = setOrderCode(invoice_id);
        const order = {
            amount: totalAmount,
            description: "Payment at Star Cinema",
            orderCode: invoice_id,
            returnUrl: url_return,
            cancelUrl: url_cancel
        };

        const paymentLink = await payos.createPaymentLink(order);
        console.log("payment create", paymentLink);
        if (!paymentLink) {
            try {
                await Invoices.updateInvoice(invoice.id, { PaymentStatus: "Cancelled" });
                await Invoices.deleteInvoice(invoice.id);
                console.log("Payment order created failed!!");
                throw new Error("Failed to created payment order.");
            } catch (updateError) {
                console.error("Error updating invoice status:", updateError);
                throw updateError;
            }
        }
        console.log("Redirecting to:", paymentLink.checkoutUrl);
        return res.status(200).json({ checkoutUrl: paymentLink.checkoutUrl });
    } catch (error) {
        console.log("Error when create Link payment:", error);
        return res.status(500).json({ status: "FAILED", message: "Payment link creation failed." });
    }
};
const getPaymentStatus = async (req, res) => {
    const statusPayment = req.body;
    try {
        console.log("paymentStatus:", statusPayment);
        if (statusPayment?.cancel === true) {
            const invoiceId = statusPayment.orderCode;
            const updateData = {
                PaymentStatus: "Cancelled",
            };
            const afterInvoice = await Invoices.updateInvoice(invoiceId, updateData);
            if (afterInvoice) {
                await Invoices.deleteInvoice(afterInvoice.id);
            }
            console.log(afterInvoice);
            return res.json({ status: "SUCCESS", message: "Hook Received!!, Invoice have deleted successful", data: statusPayment });
        } else if (statusPayment?.success) {
            const invoiceId = statusPayment?.data?.orderCode;
            const updateData = {
                PaymentStatus: "Paid",
            };
            const afterInvoice = await Invoices.updateInvoice(invoiceId, updateData);
            const { tickets, showtime } = await Tickets.getTicketsbyInvoice(afterInvoice.id);
            console.log("ticket INFOR: ", tickets.map(ticket => ticket.seat), showtime.movie.title);

            const ticketInfo = {
                tickets: tickets,
                showtime: showtime,
            }
            const sentEmail = sendTicketEmail({ userId: afterInvoice.user_id, email: afterInvoice.email, ticketInfo: ticketInfo });
            if (sentEmail) {
                console.log("Email sending successful!!")
            }
            return res.json({ status: "SUCCESS", message: "Hook Received!!", data: statusPayment });
        } else {
            return res.json({ status: "Failed", message: "Khong co thong tin thanh toan nao duoc ghi nhan!!" });
        }
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

const sendTicketEmail = async ({ userId, email, ticketInfo }) => {
    try {
        const { tickets, showtime } = ticketInfo;
        console.log("Gửi email đến:", email);
        const timestamp = Date.now();
        const orderCode = generateOrderCode(userId, timestamp);
        const qrData = tickets.map((ticket, index) => (
            `Ticket ${index + 1}:\n` +
            `Ticket Code: ${ticket.id}\n` +
            `Movie: ${showtime.movie.title}\n` +
            `Seat: ${ticket.seat.seat_name}\n` +
            `Date: ${showtime.date_time}\n` +
            `Showtime: ${FormatDate.formatHour(showtime.start_time)}~${FormatDate.formatHour(showtime.end_time)}\n`
        )).join('\n');
        console.log(qrData);
        const dataToString = JSON.stringify(qrData);
        const qrCodeImage = await QRCode.toDataURL(dataToString);
        console.log("QRCODE image:", qrCodeImage);

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: `🎟️ Vé Xem Phim - ${showtime.movie.title}`,
            html: `
                <div style="max-width:600px; margin:0 auto; padding:20px; border:1px solid #ddd; border-radius:10px; font-family:Arial, sans-serif; background-color:#f9f9f9;">
                    <h2 style="text-align:center; color:#e50914;">🎬 Xác Nhận Đặt Vé</h2>
                    <p style="font-size:16px;">Cảm ơn bạn đã đặt vé! Dưới đây là thông tin vé của bạn:</p>

                    <div style="padding:15px; border:1px solid #ccc; border-radius:8px; background-color:#fff;">
                        <p><strong>Mã Vé:</strong> ${tickets[0].invoice_id}</p>
                        <p><strong>Phim:</strong> ${showtime.movie.title}</p>
                        <p><strong>Ngày Chiếu:</strong> ${showtime.date_time}</p>
                        <p><strong>Giờ Chiếu:</strong> ${FormatDate.formatHour(showtime.start_time)}~${FormatDate.formatHour(showtime.end_time)}</p>
                        <p><strong>Ghế:</strong> ${tickets.map(ticket => ticket.seat.seat_name).join(", ")}</p>
                    </div>

                    <p style="margin-top:20px;">Vui lòng xuất trình mã QR dưới đây khi vào rạp:</p>
                    <div style="text-align:center; margin-top:10px;">
                        <img src="cid:qrcode" alt="QR Code" width="200" style="border:1px solid #ccc; padding:5px; border-radius:8px;"/>
                    </div>

                    <p style="text-align:center; margin-top:20px; font-size:14px; color:#777;">🎞️ Chúc bạn có một buổi xem phim vui vẻ!</p>
                </div>
            `,
            attachments: [{
                filename: "qrcode.png",
                content: qrCodeImage.split(";base64,").pop(),
                encoding: "base64",
                cid: "qrcode"
            }]
        };

        const sentEmail = await transporter.sendMail(mailOptions);
        console.log("✅ Email xác nhận vé đã được gửi!");
        return sentEmail;

    } catch (error) {
        console.error("❌ Lỗi khi gửi email:", error.message);
        throw error;
    }
}
function setOrderCode(invoice_id) {
    const hash = crypto.createHash("sha256").update(String(invoice_id)).digest("hex");
    const orderCode = parseInt(hash.substring(0, 12), 16) % 9007199254740991;
    return orderCode;
};
module.exports = { makePayment, getPaymentStatus };
