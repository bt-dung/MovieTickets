const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db')

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
        defaultValue: 0,
    },
    total_seats: {
        type: DataTypes.INTEGER,
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

Theaters.insertTheater = async (theaterData) => {
    try {
        const existedTheater = await Theaters.findOne({ where: { name: theaterData.name } });

        if (!existedTheater) {
            const newTheater = await Theaters.create(theaterData);
            return newTheater;
        } else {
            throw new Error(`Thearter already exists with name: ${theaterData.name}`);
        }
    } catch (error) {
        console.error("Error inserting theater:", error.message);
        throw error;
    }
};

Theaters.update = async function (id, data) {
    try {
        const [updatedRowsCount, updatedRows] = await User.update(data, {
            where: { id: id },
            returning: true
        });
        if (updatedRowsCount === 0) {
            throw new Error('Theater not found');
        }
        return updatedRows[0];
    } catch (error) {
        console.error('Error updating Theater:', error);
        throw error;
    }
};



module.exports = Theaters;