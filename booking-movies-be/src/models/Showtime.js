const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Showtime = sequelize.define('showtimes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'movies',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    screen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'screens',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'showtimes',
    timestamps: false,
});

Showtime.insertShowtime = async (showtimeData) => {
    try {
        const newShowtime = await Showtime.create(showtimeData);
        return newShowtime;
    } catch (error) {
        throw error;
    }
};

Showtime.updateShowtime = async (id, updatedData) => {
    try {
        const [updatedRows] = await Showtime.update(updatedData, {
            where: { id },
        });
        return updatedRows;
    } catch (error) {
        throw error;
    }
};

Showtime.deleteShowtime = async (id) => {
    try {
        const deletedRows = await Showtime.destroy({
            where: { id },
        });
        return deletedRows;
    } catch (error) {
        throw error;
    }
};

module.exports = Showtime;