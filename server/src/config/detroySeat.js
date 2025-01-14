const Seat = require('../models/Seat');

const detroySeat = async (screen_id) => {
    try {
        await Seat.destroy({ where: { screen_id } });
        console.log(`Seats deleted successfully for screen_id: ${screen_id}`);
    } catch (error) {
        console.error('Error deleting seats:', error.message);
        throw error;
    }
};

module.exports = detroySeat;