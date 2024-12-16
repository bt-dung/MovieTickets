const Movies = require('../models/Movies')
const MovieGenres = require('../models/MovieGenres')
const Genre = require('../models/Genres')
const { API, baseImagePath, fetchData } = require('../../Api/reqAPI')
const insertData = async () => {
    try {
        const data = await fetchData(API.nowPlayingMovies);
        for (const movie of data.results) {
            const movieData = {
                id: movie.id,
                title: movie.title,
                original_language: movie.original_language,
                overview: movie.overview,
                release_date: movie.release_date,
                adult: movie.adult ? 1 : 0,
                img_bg: baseImagePath('w780', movie.backdrop_path),
                img_poster: baseImagePath('w500', movie.poster_path),
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
            };
            Movies.insertMovie(movieData);

            if (movie.genre_ids && movie.genre_ids.length > 0) {
                const genresToInsert = movie.genre_ids.map(genreId => ({
                    movie_id: movie.id,
                    genre_id: genreId,
                }));
                MovieGenres.bulkCreate(genresToInsert, { ignoreDuplicates: true });
                console.log('Movie genres inserted successfully for movie:', movie.id);
            }
        }
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }
};
const insertGenres = async () => {
    try {
        const genres = await fetchData(API.genres);
        const newGenres = await Genre.insertGenres(genres.genres)
        if (newGenres) {
            console.log('Genres inserted successfully');
        }
    } catch (error) {
        console.error('Error inserting genres:', error.message);
    }
};
module.exports = { insertData, insertGenres };