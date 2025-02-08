const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');
const InvoiceService = require('./InvoiceService');

const Service = sequelize.define('services', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'services',
    timestamps: false,
});
InvoiceService.belongsTo(Service, { foreignKey: 'service_id' });
Service.hasMany(InvoiceService, { foreignKey: 'service_id' });

Service.createService = async function (service) {
    try {
        const existingService = await Service.findOne({ where: { name: service.name } });

        if (!existingService) {
            const newService = await Service.create(service);
            return newService;
        } else {
            throw new Error(`Service already exists: ${service.name}`);
        }
    } catch (error) {
        console.error("Error inserting service:", error.message);
        throw error;
    }
};
Service.readAllService = async function () {
    try {
        const services = Service.findAll();
        return services;
    } catch (error) {
        console.error("Error fetching service:", error.message);
        throw error;
    }
}
Service.readOneService = async function (id) {
    try {
        const service = Service.findByPk(id);
        if (!service) {
            throw new Error("Can't find service!!");
        }
        return service;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
Service.updateService = async function (id, data) {
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            throw new Error('Service not found');
        }
        await service.update(data);
        return service;
    } catch (error) {
        throw error;
    }
}
Service.deleteService = async function (id) {
    try {
        const deletedRowsCount = await Service.destroy({
            where: { id: id }
        });

        if (deletedRowsCount === 0) {
            throw new Error('Service  not found');
        }

        return deletedRowsCount;
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
};
module.exports = Service;