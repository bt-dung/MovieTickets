const DetailsMovie = require("../models/DetailsMovie");
const getDetailsMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const detailMovie = await DetailsMovie.getDetail(movieId);
        return res.status(201).json({ status: "SUCCESS", data: detailMovie });
    } catch (error) {
        console.error("Error while get detail movie:", error);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};
module.exports = { getDetailsMovie };
