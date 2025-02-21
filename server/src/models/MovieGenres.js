const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Movies = require('./Movies');
const Genre = require("./Genres");
const MovieGenres = sequelize.define('movie_genres', {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Movies,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Genre,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'movie_genres',
    timestamps: false,
    id: false,
});

Movies.belongsToMany(Genre, { through: MovieGenres, foreignKey: "movie_id" });
Genre.belongsToMany(Movies, { through: MovieGenres, foreignKey: "genre_id" });

module.exports = MovieGenres;
