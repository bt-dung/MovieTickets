const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Invoices = require("./Invoices");
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
            model: 'invoices',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    showtime_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'showtimes',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'seats',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'tickets',
    timestamps: false,
});

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
        const newTicket = await Tickets.create(ticketData);
        return newTicket;
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


module.exports = Tickets;
