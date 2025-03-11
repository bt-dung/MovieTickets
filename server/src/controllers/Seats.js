const Seat = require('../models/Seat');

const SeatController = {
    getSeatbyScreen: async (req, res) => {
        const { screenId } = req.params;
        const showtimeId = parseInt(req.query.showtimeId);
        if (isNaN(showtimeId)) {
            return res.status(400).json({ error: "Invalid showtime_id" });
        }
        console.log(showtimeId);
        try {
            const seats = await Seat.getSeatbyScreenID(screenId, showtimeId);
            return res.json(seats);
        } catch (error) {
            console.error("Fetching seats error:", error);
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },

    getSeatbyID: async (req, res) => {
        const seatIds = req.body;
        try {
            const seats = await Seat.fetchSeatById(seatIds);
            return res.json(seats);
        } catch (error) {
            console.error("Fetching seat error:", error);
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    }
};

module.exports = SeatController;