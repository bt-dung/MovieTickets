const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db')
const Screens = require('./Screens');


const Theaters = sequelize.define('theaters', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'areas',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    total_screens: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    total_seats: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'theaters',
    timestamps: false,
});

Theaters.hasMany(Screens, { foreignKey: 'theater_id' });
Screens.belongsTo(Theaters, { foreignKey: 'theater_id' });

Theaters.insertTheater = async (theaterData) => {
    try {
        const existedTheater = await Theaters.findOne({ where: { name: theaterData.name, address: theaterData.address } });
        console.log("manager:", theaterData.manager_id);
        if (!existedTheater) {
            const existingManager = await Theaters.findOne({ where: { manager_id: theaterData.manager_id } });
            if (!existingManager) {
                const newTheater = await Theaters.create(theaterData);
                return newTheater;
            } else {
                throw new Error("The manager is currently managing another theater");
            }
        } else {
            throw new Error(`Thearter already exists with name: ${theaterData.name}`);
        }
    } catch (error) {
        throw error;
    }
};

Theaters.updateTheater = async function (id, data) {
    try {
        const existingManager = await Theaters.findOne({ where: { manager_id: data.manager_id } });
        if (!existingManager) {
            const [updatedRowsCount, updatedRows] = await Theaters.update(data, {
                where: { id: id },
                returning: true
            });
            if (updatedRowsCount === 0) {
                throw new Error('Theater not found');
            }
            return updatedRows[0];
        } else {
            throw new Error("The manager is currently managing another theater");
        }
    } catch (error) {
        console.error('Error updating Theater:', error);
        throw error;
    }
};

Theaters.deleteTheater = async function (id) {
    try {
        const deletedRowsCount = await Theaters.destroy({
            where: { id: id }
        });
        if (deletedRowsCount === 0) {
            throw new Error('Theater  not found');
        }
        return deletedRowsCount;
    } catch (error) {
        console.error('Error deleting Theater:', error);
        throw error;
    }
};



module.exports = Theaters;