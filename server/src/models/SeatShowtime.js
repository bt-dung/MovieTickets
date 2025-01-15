const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const { Op } = require('sequelize');

const SeatShowtime = sequelize.define('seatShowtime', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    showtime_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    seat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Available",
        values: ['Available', "Booked", "Ending"]
    },
}, {
    tableName: 'seatShowtime',
    timestamps: false,
})

SeatShowtime.insertSeatShowtime = async (data) => {
    try {
        const existingSeatShowtime = await SeatShowtime.findByPk(data.id);
        if (!existingSeatShowtime) {
            const newSeatShowtime = await SeatShowtime.create(data);
            console.log('SeatShowtime created:', newSeatShowtime.title);
        } else {
            console.log(`SeatShowtime already exists: ${data.title}`);
        }
    } catch (error) {
        console.error("Error inserting SeatShowtime:", error);
        throw error;
    }
};

SeatShowtime.updateSeatShowtime = async (SeatShowtimeId, updateData) => {
    try {
        const result = await SeatShowtime.update(updateData, {
            where: { id: SeatShowtimeId },
        });
        return result[0];
    } catch (error) {
        console.error("Error updating SeatShowtime:", error);
        throw error;
    }
};

SeatShowtime.deleteSeatShowtime = async (SeatShowtimeId) => {
    try {
        const result = await SeatShowtime.destroy({
            where: { id: SeatShowtimeId },
        });
        return result;
    } catch (error) {
        console.error("Error deleting SeatShowtime:", error);
        throw error;
    }
};

SeatShowtime.getSeatShowtimeByIds = async function (SeatShowtimeIds) {
    try {
        const SeatShowtime = await SeatShowtime.findAll({
            where: {
                id: { [Op.in]: SeatShowtimeIds }
            },
        });
        return SeatShowtime;
    } catch (error) {
        console.error("Error while fetching SeatShowtime by IDs:", error);
        throw error;
    }
};
module.exports = SeatShowtime;

