const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');
const User = require("./User");
const InvoiceService = require("./InvoiceService");
const moment = require("moment");
const Tickets = require('./Tickets');
const Invoices = sequelize.define('invoices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    TotalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    PaymentStatus: {
        type: DataTypes.ENUM('Paid', 'Pending', 'Cancelled'),
        defaultValue: 'Pending',
    },
    theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'theaters',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'invoices',
    timestamps: false,
});
Invoices.belongsTo(User, { foreignKey: 'user_id' });
InvoiceService.belongsTo(Invoices, { foreignKey: 'invoice_id' });
Invoices.hasMany(InvoiceService, { foreignKey: 'invoice_id' });
Invoices.hasMany(Tickets, { foreignKey: 'invoice_id' });
Tickets.belongsTo(Invoices, { foreignKey: 'invoice_id' });

Invoices.getAllInvoicebyTheater = async (theaterId, dateTime, page, limit) => {
    try {
        const startDate = moment(dateTime).startOf("day").toDate();
        const endDate = moment(dateTime).endOf("day").toDate();

        const totalInvoice = await Invoices.findAll({
            where: {
                theater_id: theaterId,
                purchase_date: {
                    [Op.between]: [startDate, endDate],
                },
            }
        });
        const invoices = await Invoices.findAll({
            where: {
                theater_id: theaterId,
                purchase_date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "email"],
                },
            ],
            offset: page * limit,
            limit: limit,
            raw: true,
        });
        invoices.forEach((invoice) => {
            invoice.purchase_date = moment(invoice.purchase_date).format("YYYY-MM-DD HH:mm:ss");
        });
        return { invoices, totalInvoice };
    } catch (error) {
        console.error("Error fetching showtime by TheaterId:", error);
        throw error;
    }
};
Invoices.fetchInvoicebyId = async function (invoiceId) {
    try {
        const invoice = await Invoices.findByPk(invoiceId);
        return invoice;
    } catch (error) {
        throw error;
    }
};
Invoices.createInvoice = async (invoiceData) => {
    try {
        const { user_id, email, TotalAmount, theater_id } = invoiceData;
        if (!user_id || !email || !TotalAmount || !theater_id) {
            throw new Error('Missing required fields: user_id,email, totalAmount, theater_id');
        };
        const newInvoiceData = {
            user_id,
            email,
            TotalAmount,
            theater_id,
            purchase_date: new Date(),
        };
        const newInvoice = await Invoices.create(newInvoiceData);
        return newInvoice;
    } catch (error) {
        console.error("Error inserting invoice:", error);
        throw error;
    }
};
Invoices.fetchInvoiceByUser = async function (userId) {
    try {
        const invoices = await Invoices.findAll({
            where: { user_id: userId },
        })
        return invoices;
    } catch (error) {
        throw error
    };
}
Invoices.updateInvoice = async (id, updateData) => {
    const Tickets = sequelize.models.tickets;
    try {
        const invoice = await Invoices.findByPk(id, {
            include: [{
                model: Tickets,
                required: false,
            }]
        });
        if (!invoice) {
            throw new Error(`Invoice not found with id: ${id}`);
        }
        await invoice.update(updateData);
        const invoiceData = invoice.get({ plain: true });
        return invoiceData;
    } catch (error) {
        console.error("Error updating invoice:", error);
        throw error;
    }
};

// Invoices.getTicketsbyInvoice = async function (invoice_id) {
//     const Showtime = sequelize.models.showtimes;
//     const Seats = sequelize.models.seats;
//     try {
//         const invoices = await Invoices.findByPk(invoice_id, {
//             include: [{
//                 model: Tickets,
//                 required: false,
//                 include: [{
//                     model: Seats,
//                     as: 'seat',
//                     attributes: ['seat_name'],
//                 }]
//             }]
//         });
//         console.log(invoices);
//         if (!invoices.tickets || invoices.tickets.length === 0) {
//             throw new Error("Get list of booked tickets on invoice failed!!");
//         }
//         const showtimeIds = invoices.tickets.map(ticket => ticket.showtime_id);

//         const uniqueShowtimeIds = [...new Set(showtimeIds)];

//         if (uniqueShowtimeIds.length !== 1) {
//             throw new Error("The tickets in the invoice have different showtimes!");
//         }
//         const showtime_id = uniqueShowtimeIds[0];
//         console.log(showtime_id);
//         const showtime = await Showtime.getMovieName(showtime_id);
//         return { invoices, showtime }
//     } catch (error) {
//         throw error;
//     }
// }
Invoices.deleteInvoice = async (id) => {
    try {
        const deleteData = await Invoices.findByPk(id);
        if (!deleteData) {
            throw new Error('Invoice not found');
        }
        if (deleteData.PaymentStatus !== "Cancelled") {
            throw new Error("Current invoice status cannot be deleted");
        };
        const deletedRowsCount = await Invoices.destroy({
            where: { id: id }
        });
        return deletedRowsCount;
    } catch (error) {
        console.error("Error deleting screen:", error);
        throw error;
    }
};

module.exports = Invoices;
