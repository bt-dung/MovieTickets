const SeatShowtime = require("../models/SeatShowtime");

const insertSeatShowtime = async (req, res) => {
  const { seat_id, showtime_id } = req.body;
  try {
    const data = SeatShowtime.insertSeatShowtime({seat_id, showtime_id});
    return res.status(201).json({ status: "SUCCESS", message: 'Screen created successfully', data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "FAILED", message: error.message });
  }
};

module.exports = { insertSeatShowtime };
