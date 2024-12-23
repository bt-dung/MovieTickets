const Showtime = require('../models/Showtime')

const ScheduleShowtime = async (req, res) => {
    const { movie_id, screen_id, date_time, start_time, end_time } = req.body;
    console.log("Showtime:", req.body);
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

module.exports = ScheduleShowtime;