const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Genre = sequelize.define('genres', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'genres',
    timestamps: false,
});
/**
 * Insert multiple genres into the database
 * @param {Array} genresData - Array of genre objects { id, name }
 * @returns {Array} - Array of inserted or ignored genres
 */
Genre.insertGenres = async (genresData) => {
    try {
        for (const genre of genresData) {
            const existingGenre = await Genre.findByPk(genre.id);

            if (!existingGenre) {
                await Genre.create(genre);
                console.log(`Inserted new genre: ${genre.name}`);
            } else {
                console.log(`Genre already exists: ${genre.name}`);
            }
        }
    } catch (error) {
        console.error('Error inserting genres:', error.message);
        throw error;
    }
};


module.exports = Genre;
