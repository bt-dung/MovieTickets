const Seat = require('../models/Seat');
const createSeat = require("./createSeat");

const updateSeats = async ({ screen_id, rows, columns, seat_type_id = 1 }) => {
    try {
        await Seat.destroy({ where: { screen_id } });
        await createSeat({ rows, columns, screen_id, seat_type_id });
        console.log(`Seats updated successfully for screen_id: ${screen_id}`);
    } catch (error) {
        console.error('Error updating seats:', error.message);
        throw error;
    }
};

module.exports = updateSeats;