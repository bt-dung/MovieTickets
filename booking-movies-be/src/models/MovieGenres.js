const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const MovieGenres = sequelize.define('movie_genres', {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'movies',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'genres',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'movie_genres',
    timestamps: false,
    id: false,
});
sequelize.sync().then(() => {
    console.log('MovieGenre table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
module.exports = MovieGenres;
