const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');
const User = require("./User");
const InvoiceService = require("./InvoiceService");
const moment = require("moment");
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
Invoices.belongsTo(User, { foreignKey: 'user_id' });
InvoiceService.belongsTo(Invoices, { foreignKey: 'invoice_id' });
Invoices.hasMany(InvoiceService, { foreignKey: 'invoice_id' });

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

Invoices.createInvoice = async (invoiceData) => {
    try {
        const { user_id, theater_id } = invoiceData;
        if (!user_id || !theater_id) {
            throw new Error('Missing required fields: user_id, theater_id');
        };
        console.log(user_id, theater_id);
        const newInvoiceData = {
            user_id,
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

Invoices.updateInvoice = async (id, updateData) => {
    try {
        const invoice = await Invoices.findByPk(id);
        if (!invoice) {
            throw new Error(`Invoice not found with id: ${id}`);
        }
        await invoice.update(updateData);
        return invoice;
    } catch (error) {
        console.error("Error updating invoice:", error);
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
