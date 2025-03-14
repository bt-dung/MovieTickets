const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');
const Invoices = require('../models/Invoices');
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

InvoiceService.createServiceInvoice = async (serviceData) => {
    try {
        const existingService = await InvoiceService.findOne({ where: { invoice_id: serviceData.invoice_id, service_id: serviceData.service_id } });
        if (existingService) {
            throw new Error(`Service ${serviceData.service_id} booked!!`);
        }
        const newService = await InvoiceService.create(serviceData);
        return newService;
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};
InvoiceService.deleteServicesInInvoice = async (invoice_id) => {
    try {
        const deletedRowsCount = await InvoiceService.destroy({ where: { invoice_id: invoice_id } });
        if (!deletedRowsCount) {
            throw new Error("Cant delete service of invoice!!");
        }
        return deletedRowsCount;
    } catch (error) {
        console.error("Error deleting services in invoice:", error);
        throw error;
    }
};
module.exports = InvoiceService;

