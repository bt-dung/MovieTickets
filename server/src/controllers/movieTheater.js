const MovieTheater = require('../models/MovieTheater');
const Movies = require('../models/Movies');

const insertMovie = async (req, res) => {
    const { movieId, theaterId } = req.body
    try {
        const newData = await MovieTheater.insertData(theaterId, movieId);
        return res.status(201).json({
            status: "SUCCESS",
            message: `Movie ID ${movieId} added to the theater.`,
            data: newData
        });
    } catch (error) {
        console.error('Error inserting movie:', error);
        return res.status(500).json({
            message: 'Error inserting movie',
            error: error.message
        });
    }

};

const getMoviesInTheater = async (req, res) => {
    const { theaterId } = req.params;
    try {
        const movieIds = await MovieTheater.findAll({
            where: { theater_id: theaterId },
            attributes: ['movie_id'],
        });

        const movieIdList = movieIds.map(movie => movie.movie_id);

        if (movieIdList.length === 0) {
            return res.json({ status: "SUCCESS", message: "No movies found in the specified theater.", data: [] });
        }
        const movies = await Movies.getMoviesByIds(movieIdList);
        return res.json({ status: "SUCCESS", message: "Fetch movies in theater successful!!", data: movies });
    } catch (error) {
        console.error("Error while fetching movies in theater:", error);
        return res.json({ status: "FAILED", message: "Error while fetching movies in theater", error: error.message, data: null });
    }
};

const deleteMoveinTheater = async (req, res) => {
    const { theater_id, movie_id } = req.body;

    try {
        const deletedCount = await MovieTheater.deleteMovie(theater_id, movie_id);
        res.status(200).json({
            status: "SUCCESS",
            message: 'Movie deleted successfully!',
            deletedCount: deletedCount
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: error.message || 'An error occurred while deleting the movie.'
        });
    }
};

module.exports = { insertMovie, getMoviesInTheater, deleteMoveinTheater };