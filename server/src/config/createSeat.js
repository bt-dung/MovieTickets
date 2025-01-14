const Seat = require("../models/Seat")

const createSeat = async ({ rows, columns, screen_id, seat_type_id }) => {
    try {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < rows; i++) {
            for (let j = 1; j <= columns; j++) {
                const seat_name = `${alphabet[i]}${j}`;
                await Seat.insertSeat({
                    seat_name,
                    screen_id,
                    seat_type_id,
                });
            }
        }
        console.log(`Successfully created seats for screen_id: ${screen_id}`);
    } catch (error) {
        console.error('Error creating seats:', error.message);
        throw error;
    }
};

module.exports = createSeat;

