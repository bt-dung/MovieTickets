const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

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

Invoices.getInvoicebyTheater = async (theaterId) => {
    try {
        const invoices = await Invoices.findAll({
            where: { theater_id: theaterId }
        });
        return invoices;
    } catch (error) {
        console.error("Error fetching invoices by TheaterId:", error);
        throw error;
    }
};

Invoices.createInvoice = async (invoiceData) => {
    try {
        const newInvoice = await Invoices.create(invoiceData);
        return newInvoice;
    } catch (error) {
        console.error("Error inserting invoice:", error);
        throw error;
    }
};

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
