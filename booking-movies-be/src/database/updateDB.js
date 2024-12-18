const Movies = require('../models/Movies')
const MovieGenres = require('../models/MovieGenres')
const Genre = require('../models/Genres')
const DetailMovie = require('../models/DetailsMovie')
const { API, baseImagePath, fetchData } = require('../../Api/reqAPI')
const checkGenresExist = require('../config/checkGenresExist ')
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
            const DetailData = await fetchData(API.movieDetails(movieData.id))
            const newData = {
                movie_id: DetailData.id,
                backdrop_path: baseImagePath('w780', DetailData.backdrop_path),
                budget: DetailData.budget,
                overview: DetailData.overview,
                release_date: DetailData.release_date,
                revenue: DetailData.revenue,
                runtime: DetailData.runtime,
                status: DetailData.status,
            };
            DetailMovie.insertDetail(newData);
            if (movie.genre_ids && movie.genre_ids.length > 0) {
                const existingGenreIds = await checkGenresExist(movie.id, movie.genre_ids);
                const genresToInsert = movie.genre_ids
                    .filter(genreId => !existingGenreIds.includes(genreId))
                    .map(genreId => ({
                        movie_id: movie.id,
                        genre_id: genreId,
                    }));
                if (genresToInsert.length > 0) {
                    await MovieGenres.bulkCreate(genresToInsert, { ignoreDuplicates: true });
                    console.log('Movie genres inserted successfully for movie:', movie.id);
                } else {
                    console.log('All genres already exist for movie:', movie.id);
                }
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