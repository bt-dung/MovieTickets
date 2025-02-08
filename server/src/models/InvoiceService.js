const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');

const InvoiceService = sequelize.define('invoice_services', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
}, {
    tableName: 'invoice_services',
    timestamps: false,
});

module.exports = InvoiceService;