const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const DetailMovie = sequelize.define('detail_movie', {
    movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'movies',
            key: 'id',
        },
    },
    backdrop_path: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    revenue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    runtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'detail_movie',
    timestamps: false,
});

DetailMovie.insertDetail = async (DetailData) => {
    try {
        const existingDetailMovie = await DetailMovie.findByPk(DetailData.movie_id);
        if (!existingDetailMovie) {
            const newDetailMovie = await DetailMovie.create(DetailData);
            console.log(`Detail of movie ${newDetailMovie.movie_id} created successful!!`);
        } else {
            console.log(`Detail already exists: ${existingDetailMovie.movie_id}`);
        }
    } catch (error) {
        console.error("Error inserting detail movie:", error);
        throw error;
    }
};
DetailMovie.getDetail = async function (movieId) {
    try {
        const detailMovie = await DetailMovie.findByPk(movieId, {
            include: {
                model: Movies,
            },
        });
        return detailMovie;
    } catch (error) {
        throw error;
    }
};
DetailMovie.updateDetail = async (movieId, updateDetail) => {
    try {
        const result = await DetailMovie.update(updateDetail, {
            where: { id: movieId },
        });
        return result[0];
    } catch (error) {
        console.error("Error updating detail movie:", error);
        throw error;
    }
};

DetailMovie.deleteDetail = async (movieId) => {
    try {
        const result = await DetailMovie.destroy({
            where: { movie_id: movieId },
        });
        return result;
    } catch (error) {
        console.error("Error deleting detail movie:", error);
        throw error;
    }
};

module.exports = DetailMovie;