const Showtime = require('../models/Showtime')

const ScheduleShowtime = async (req, res) => {
    const { movie_id, screen_id, date_time, start_time, end_time } = req.body;
    if (!movie_id || !screen_id || !date_time || !start_time || !end_time) {
        return res.status(400).json({ status: "Failed!!", message: 'All fields are required!!' });
    }
    const startDateTime = new Date(`${date_time}T${start_time}`);
    const endDateTime = new Date(`${date_time}T${end_time}`);
    if (startDateTime >= endDateTime) {
        return res.status(400).json({ status: "Failed!!", message: 'Start time must be before end time!!' });
    }
    const showtimeData = {
        movie_id,
        screen_id,
        date_time,
        start_time,
        end_time
    };
    try {
        const newShowtime = await Showtime.insertShowtime(showtimeData);
        return res.status(201).json({ status: "Success", message: 'Showtime scheduled successfully!', data: newShowtime });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed!!", message: 'Internal server error' });
    }
};
const getShowtime = async (req, res) => {
    const { theaterId, dateTime } = req.params;
    const page = parseInt(req.query.pageNumber);
    const limit = parseInt(req.query.limit);
    const formattedDateTime = new Date(dateTime).toISOString().split('T')[0];
    try {
        const { showtimes, totalShowtimes } = await Showtime.getShowtimebyTheater(theaterId, formattedDateTime, page, limit);

        const totalPages = Math.ceil(totalShowtimes / limit);

        return res.status(200).json({
            status: "SUCCESS", data: showtimes, totalPages: totalPages
        });
    } catch (error) {
        return res.status(404).json({ status: "FAILED", message: error.message });
    }
};


module.exports = { ScheduleShowtime, getShowtime };