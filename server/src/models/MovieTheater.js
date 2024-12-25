const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const MovieTheater = sequelize.define('movie_theater', {
    theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'theaters',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
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
}, {
    tableName: 'movie_theater',
    timestamps: false,
    id: false,
});

module.exports = MovieTheater;

MovieTheater.insertData = async function (theater_id, movie_id) {
    try {
        const existingEntry = await MovieTheater.findOne({
            where: {
                theater_id: theater_id,
                movie_id: movie_id
            }
        });
        if (existingEntry) {
            throw new Error('Movie existed!!')
        }
        const newEntry = await MovieTheater.create({
            theater_id: theater_id,
            movie_id: movie_id
        });
        return newEntry;
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        throw error;
    }
};

MovieTheater.deleteMovie = async function (theater_id, movie_id) {
    try {
        const deletedCount = await MovieTheater.destroy({
            where: {
                theater_id: theater_id,
                movie_id: movie_id
            }
        });
        if (deletedCount === 0) {
            throw new Error('Can not delete Movie!!')
        }
        return deletedCount;
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
        throw error;
    }
};
