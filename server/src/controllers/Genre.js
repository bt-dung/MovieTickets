const Genre = require("../models/Genres");

const GenreController = {
    getAllGenre: async (req, res) => {
        try {
            const genres = await Genre.findAll();
            return res.status(201).json({ status: "SUCCESS", message: "Fetch genre successfull!!", data: genres });
        } catch (error) {
            console.error("Error when fetching genre:", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },
}
module.exports = GenreController;