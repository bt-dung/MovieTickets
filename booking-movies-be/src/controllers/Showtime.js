const Showtime = require('../models/Showtime')

const ScheduleShowtime = async (req, res) => {
    const { movie_id, screen_id, date_time, start_time, end_time } = req.body;
    if (!movie_id || !screen_id || !date_time || !start_time || !end_time) {
        return res.status(400).json({ status: "Failed!!", message: 'Thiếu thông tin cần thiết để xếp lịch.' });
    }
}