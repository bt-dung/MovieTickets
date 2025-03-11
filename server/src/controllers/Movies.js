const Movie = require("../models/Movies")
const getAllMovies = async (req, res) => {
    const page = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const genresId = req.body;
    try {
        const { movies, totalPages } = await Movie.fetchMovies(page, limit, genresId);
        return res.json({ content: movies, totalPages });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: 'An error occurred while gets all the movie',
            error: error.message
        });
    }
};

const searchMovies = async (req, res) => {
    const searchQuery = req.query.search || "";
    try {
        const data = await Movie.getMovieSearched(searchQuery);
        if (data.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        }
        return res.json({ content: data });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: 'An error occurred while searching movies',
            error: error.message
        });
    }
};

const getFilmNewRelease = async (req, res) => {
    try {
        const films = await Movie.findAll({
            order: [['release_date', 'DESC']],
            limit: 5,
            logging: console.log,
        });
        if (films.length === 0) {
            return res.json({ status: "FAILED", message: "khong biet tai sao!!" });
        }
        return res.status(200).json(films);
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ status: "FAILED", message: 'Error when fetching movie!!', error });
    }
};
const getDetailsMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const detailMovie = await Movie.getDetail(movieId);
        return res.status(201).json({ status: "SUCCESS", data: detailMovie });
    } catch (error) {
        console.error("Error while get detail movie:", error);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};

const getMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Movie.fetchMovie(id);
        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    }
};

module.exports = { getMovie, getAllMovies, getFilmNewRelease, searchMovies, getDetailsMovie }