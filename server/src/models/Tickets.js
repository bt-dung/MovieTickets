const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Invoices = require("./Invoices");
const Seats = require("./Seat");
const SeatType = require("./SeatType");
const Showtime = require("./Showtime");
const Tickets = sequelize.define('tickets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Invoices,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    showtime_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Showtime,
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Seats,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'tickets',
    timestamps: false,
});
Showtime.hasMany(Tickets, { foreignKey: 'showtime_id' });
Invoices.hasMany(Tickets, { foreignKey: 'invoice_id' });
Tickets.belongsTo(Invoices, { foreignKey: 'invoice_id' });
Tickets.belongsTo(Showtime, { foreignKey: 'showtime_id' });

Tickets.getTicketsByTheater = async (theaterId) => {
    try {
        const invoices = await Invoices.findAll({ where: { theater_id: theaterId } });
        const invoiceIds = invoices.map(invoice => invoice.id);

        const tickets = await Tickets.findAll({
            where: { invoice_id: invoiceIds },
        });
        return tickets;
    } catch (error) {
        console.error("Error fetching tickets by TheaterId:", error);
        throw error;
    }
};

/**
 * Create a new ticket
 * @param {Object} ticketData
 */
Tickets.createTicket = async (ticketData) => {
    try {
        const titleMovie = await Showtime.getMovieName(ticketData.showtime_id);
        const existingTicket = await Tickets.findOne({ where: { showtime_id: ticketData.showtime_id, seat_id: ticketData.seat_id } });
        if (existingTicket) {
            throw new Error(`Seat ${ticketData.seat_id} booked!!`);
        }
        const newTicket = await Tickets.create(ticketData);
        return newTicket, titleMovie;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
};

/**
 * Update a ticket by ID
 * @param {number} id 
 * @param {Object} ticketData
 */
Tickets.updateTicket = async (id, ticketData) => {
    try {
        const ticket = await Tickets.findByPk(id);
        if (!ticket) {
            throw new Error("Ticket not found");
        }

        const updatedTicket = await ticket.update(ticketData);
        return updatedTicket;
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw error;
    }
};

/**
 * Delete a ticket by ID
 * @param {number} id 
 */
Tickets.deleteTicket = async (id) => {
    try {
        const deletedRowsCount = await Tickets.destroy({ where: { id } });
        if (!deletedRowsCount) {
            throw new Error("Ticket not found or already deleted");
        }
        return deletedRowsCount;
    } catch (error) {
        console.error("Error deleting ticket:", error);
        throw error;
    }
};

Tickets.afterCreate(async (ticket, options) => {
    try {
        const invoice = await Invoices.findByPk(ticket.invoice_id);
        if (!invoice) return;

        const seat = await Seats.findOne({
            where: { id: ticket.seat_id },
            include: { model: SeatType, attributes: ["price"] },
        });

        if (!seat) return;

        await Invoices.increment("TotalAmount", {
            by: parseFloat(seat.seat_type.price) || 0,
            where: { id: invoice.id },
        });
    } catch (error) {
        console.error('Error prepare the invoice :', error);
    }
});

module.exports = Tickets;
