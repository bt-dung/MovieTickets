const Showtime = require('../models/Showtime')
const Screens = require('../models/Screens');
const MovieTheater = require("../models/MovieTheater");
const ScheduleShowtime = async (req, res) => {
    const { movie_id, screen_id, date_time, start_time, end_time } = req.body;
    console.log("selectedDate:", date_time);
    if (!movie_id || !screen_id || !date_time || !start_time || !end_time) {
        return res.status(400).json({ status: "FAILED", message: 'All fields are required!!' });
    }
    const startDateTime = new Date(`${date_time}T${start_time}`);
    const endDateTime = new Date(`${date_time}T${end_time}`);
    if (startDateTime >= endDateTime) {
        return res.status(400).json({ status: "FAILED", message: 'Start time must be before end time!!' });
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
        return res.status(201).json({ status: "SUCCESS", message: 'Showtime scheduled successfully!', data: newShowtime });
    } catch (error) {
        console.error("Error while inserting showtime:", error.message);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};
const getAllShowtimeofTheater = async (req, res) => {
    const { theaterId, dateTime } = req.params;
    const page = parseInt(req.query.pageNumber);
    const limit = parseInt(req.query.limit);
    const date = new Date(dateTime);

    const formattedDateTime = date.toLocaleDateString('en-CA').replace(/-/g, '/');
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

const getShowtime = async (req, res) => {
    const { id } = req.params;
    try {
        const showtime = await Showtime.fetchShowtime(id);
        return res.json({ status: "SUCCESS", data: showtime });
    } catch (error) {
        console.error("Fetching showtime error:", error);
        return res.status(404).json({ status: "FAILED", message: error.message });
    }
};

const updateShowtime = async (req, res) => {
    const { id } = req.params;
    const { movie_id, screen_id, date_time, start_time, end_time } = req.body;
    if (!movie_id || !screen_id || !date_time || !start_time || !end_time) {
        return res.status(400).json({ status: "FAILED", message: 'All fields are required!!' });
    }
    const startDateTime = new Date(`${date_time}T${start_time}`);
    const endDateTime = new Date(`${date_time}T${end_time}`);
    if (startDateTime >= endDateTime) {
        return res.status(400).json({ status: "FAILED", message: 'Start time must be before end time!!' });
    }
    const updateData = {
        movie_id,
        screen_id,
        date_time,
        start_time,
        end_time
    };
    try {
        const updatedShowtime = await Showtime.updateShowtime(id, updateData);
        return res.status(200).json({ status: "SUCCESS", message: 'Showtime updated successfully', data: updatedShowtime });
    } catch (error) {
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};

const deleteShowtime = async (req, res) => {
    const { id } = req.params;
    try {
        await Showtime.deleteShowtime(id);
        return res.status(200).json({ status: "SUCCESS", message: 'Showtime deleted successfully' });
    } catch (error) {
        console.error("Error while delete showtime: ", error);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};
const getShowtimeofMovieInTheater = async (req, res) => {
    const { theaterId, movieId, dateTime } = req.params;
    const date = new Date(dateTime);
    const formattedDateTime = date.toLocaleDateString('en-CA').replace(/-/g, '/');
    try {
        const showtimes = await Showtime.fetchShowtimeofMovieInTheater(movieId, theaterId, formattedDateTime);
        return res.status(200).json({
            status: "SUCCESS", data: showtimes
        });
    } catch (error) {
        return res.status(404).json({ status: "FAILED", message: error.message });
    }
};
const getShowtimesofMovie = async (req, res) => {
    const { movieId, dateTime } = req.params;
    const date = new Date(dateTime);
    const formattedDateTime = date.toLocaleDateString('en-CA').replace(/-/g, '/');
    const Theater = await MovieTheater.findAll({
        where: { movie_id: movieId },
        attributes: ['theater_id'],
        raw: true,
    })
    const theaterIds = Theater.map(theater => theater.theater_id);
    try {
        const showtimes = await Showtime.fetchShowtimesofMovie(movieId, formattedDateTime, theaterIds);
        return res.status(200).json({
            status: "SUCCESS", data: showtimes
        });
    } catch (error) {
        console.error("Error while get showtimes for movie", error);
        return res.status(404).json({ status: "FAILED", message: error.message });
    }

};


module.exports = { ScheduleShowtime, getAllShowtimeofTheater, getShowtime, updateShowtime, deleteShowtime, getShowtimeofMovieInTheater, getShowtimesofMovie };