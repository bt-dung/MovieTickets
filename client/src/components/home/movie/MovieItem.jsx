const MovieItem = ({ movie }) => {
    return (
        <div className="item">
            <div className="movie-grid">
                <div className="movie-thumb c-thumb">
                    <a href={`/starcinema/movie-detail/${movie.id}`}>
                        <img src={movie.img_poster} alt={movie.title} />
                    </a>
                </div>
                <div className="movie-content bg-one">
                    <h5 className="title m-0">
                        <a href={`/starcinema/movie-detail/${movie.id}`}>{movie.title}</a>
                    </h5>
                    <ul className="movie-rating-percent">
                        <li>
                            <span className="content text-danger" style={{ fontSize: "12px" }}>Release Date: {movie.release_date}</span>
                        </li>
                        <li>
                            <div className="thumb">
                                <img src="../../../assets/images/movie/tomato.png" alt="rating" />
                            </div>
                            <span className="content" style={{ color: "white" }}>IMDB: {movie.vote_average}</span>
                        </li>
                        <li>
                            <div className="thumb">
                                <img src="../../../assets/images/movie/cake.png" alt="popularity" />
                            </div>
                            <span className="content" style={{ color: "white" }}>{movie.vote_count}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;
