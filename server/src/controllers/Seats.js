const Seat = require('../models/Seat');

const SeatController = {
    getSeatbyScreen: async (req, res) => {
        const { screenId } = req.params;
        try {
            const seats = await Seat.findAll({ where: { screen_id: screenId } });
            return res.json(seats);
        } catch (error) {
            console.error("Fetching seats error:", error);
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },
};

module.exports = SeatController;