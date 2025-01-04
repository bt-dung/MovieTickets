const MovieTheater = require('../models/MovieTheater')

const insertMovie = async (req, res) => {
    const { movie_id, theater_id } = req.body
    try {
        const newData = await MovieTheater.insertData(theater_id, movie_id);
        return res.status(201).json({
            message: 'Movie added to theater successfully',
            data: newEntry
        });
    } catch (error) {
        console.error('Error inserting movie:', error);
        return res.status(500).json({
            message: 'Error inserting movie',
            error: error.message
        });
    }

};