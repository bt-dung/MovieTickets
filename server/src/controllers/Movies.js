const Movie = require("../models/Movies")

const getAllMovies = async (req, res) => {

    const page = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const totalUsers = await Movie.count();
        const totalPages = Math.ceil(totalUsers / limit);
        const data = await Movie.findAll({
            offset: page * limit,
            limit: limit,
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

module.exports = { getMovie, getAllMovies, getFilmNewRelease }