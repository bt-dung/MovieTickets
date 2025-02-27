export const groupShowtimesByMovie = (showtimes) => {
    if (showtimes.length === 0) return null;

    const { movie_id, movie } = showtimes[0];
    const groupedMovie = {
        movie_id,
        title: movie.title,
        theaters: [],
    };

    showtimes.forEach((showtime) => {
        const theaterId = showtime.screen.theater_id;
        let theater = groupedMovie.theaters.find((t) => t.theater_id === theaterId);
        if (!theater) {
            theater = {
                theater_id: theaterId,
                showtimes: [],
            };
            groupedMovie.theaters.push(theater);
        }

        theater.showtimes.push({
            id: showtime.id,
            date_time: showtime.date_time,
            start_time: showtime.start_time,
            end_time: showtime.end_time,
            screen: showtime.screen,
            movie: showtime.movie,
            movie_id: showtime.movie_id
        });
    });

    return groupedMovie;
};