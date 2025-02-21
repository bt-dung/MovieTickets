const Movie = require("../models/Movies")
const getAllMovies = async (req, res) => {
    const page = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const totalMovies = await Movie.count();
        const totalPages = Math.ceil(totalMovies / limit);
        const data = await Movie.findAll({
            offset: (page - 1) * limit,
            limit: limit,
            order: [['release_date', 'DESC']],
        });
        return res.json({ content: data, totalPages, });
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
    console.log("searchQuery:", searchQuery);
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


const getMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const data = Movie.findByPk(id);
        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    }
}

module.exports = { getMovie, getAllMovies, getFilmNewRelease, searchMovies }