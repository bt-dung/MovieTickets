const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const { Op } = require('sequelize');

const Movies = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    original_language: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    adult: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    img_bg: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    img_poster: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    vote_average: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
    },
    vote_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    }
}, {
    tableName: 'movies',
    timestamps: false,
});

/**
 * Insert a new movie
 * @param {Object} movieData - Data to insert
 * @returns {Object} - The created movie object
 */

Movies.fetchMovies = async function (page, limit) {
    const Genre = sequelize.models.genres;
    try {
        const totalMovies = await Movies.count();
        const movies = await Movies.findAll({
            offset: (page - 1) * limit,
            limit: limit,
            order: [["release_date", "DESC"]],
            include: [
                {
                    model: Genre,
                    as: "genres",
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
            ],
        });
        console.log(totalMovies);
        const totalPages = Math.ceil(totalMovies / limit);
        return { movies, totalPages };
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw error;
    }
}
Movies.insertMovie = async (movieData) => {
    try {
        const existingMovie = await Movies.findByPk(movieData.id);
        if (!existingMovie) {
            const newMovie = await Movies.create(movieData);
            console.log('Movie created:', newMovie.title);
        } else {
            console.log(`Movie already exists: ${movieData.title}`);
        }
    } catch (error) {
        console.error("Error inserting movie:", error);
        throw error;
    }
};

/**
 * Update an existing movie by ID
 * @param {Number} movieId - ID of the movie to update
 * @param {Object} updateData - Data to update
 * @returns {Number} - Number of rows affected
 */
Movies.updateMovie = async (movieId, updateData) => {
    try {
        const result = await Movies.update(updateData, {
            where: { id: movieId },
        });
        return result[0];
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
};

/**
 * Delete a movie by ID
 * @param {Number} movieId - ID of the movie to delete
 * @returns {Number} - Number of rows deleted
 */
Movies.deleteMovie = async (movieId) => {
    try {
        const result = await Movies.destroy({
            where: { id: movieId },
        });
        return result;
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};

Movies.getMoviesByIds = async function (movieIds) {
    const Genre = sequelize.models.genres;
    try {
        const movies = await Movies.findAll({
            where: {
                id: { [Op.in]: movieIds }
            },
            include: [
                {
                    model: Genre,
                    as: "genres",
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
            ],
            order: [["release_date", "DESC"]],
        });
        return movies;
    } catch (error) {
        console.error("Error while fetching movies by IDs:", error);
        throw error;
    }
};
Movies.getMovieSearched = async function (searchQuery) {
    try {
        const data = await Movies.findAll({
            where: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('title')),
                'LIKE',
                `%${searchQuery.toLowerCase()}%`
            )
        });
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
Movies.fetchMovie = async function (movieId) {
    const Genre = sequelize.models.genres;
    try {
        const movies = await Movies.findByPk(movieId, {
            include: [
                {
                    model: Genre,
                    as: "genres",
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
            ],
        });
        return movies;
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw error;
    };
};
module.exports = Movies;
