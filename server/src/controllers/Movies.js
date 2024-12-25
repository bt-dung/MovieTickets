const Movie = require("../models/Movies")

const getAllMovies = async (req, res) => {
    await Movie
        .findAll()
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                message: "Unable to fetch records!",
            });
        });
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

module.exports = { getMovie, getAllMovies }