const MovieGenres = require('../models/MovieGenres');

const checkGenresExist = async (movieId, genreIds) => {
    const existingGenres = await MovieGenres.findAll({
        where: {
            movie_id: movieId,
            genre_id: genreIds,
        },
        attributes: ['movie_id', 'genre_id'],
    });
    const existingGenreIds = existingGenres.map(genre => genre.genre_id);
    return existingGenreIds;
};
module.exports = checkGenresExist;