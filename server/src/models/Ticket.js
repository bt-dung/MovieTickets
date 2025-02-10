const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const { Op } = require('sequelize');

const Ticket = sequelize.define('tickets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    seatShowtime_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'tickets',
    timestamps: false,
})


// Ticket.insertTicket = async (data) => {
//     try {
//         const existingTicket = await Ticket.findByPk(data.id);
//         if()
//     } catch (error) {
        
//     }
// }
