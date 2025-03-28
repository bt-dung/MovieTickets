import React from "react";

const MovieItemList = ({ movie }) => {
  return (
    <div class="movie-list">
      <div class="movie-thumb c-thumb">
        <a
          href={`/starcinema/movie-detail/${movie.id}`}
          class="w-100 bg_img h-100"
          data-background={""}
        >
          <img src={movie.img_poster} alt={movie.title} />
        </a>
      </div>
      <div class="movie-content bg-one">
        <h2 class="title">
          <a href={`/starcinema/movie-detail/${movie.id}`}>{movie.title}</a>
        </h2>
        <div class="movie-tags" >
          {movie.genres.map((item) => (
            <p style={{ color: "tomato" }} href="#" key={item.id}>
              {item.name}
            </p>
          ))}
        </div>
        <div class="release" style={{ marginTop: "10px" }}>
          <span>Release Date : </span> {movie.release_date}
        </div>
        <ul class="movie-rating-percent">
          <li>
            <div class="thumb">
              <img
                src="../../../../assets/images/movie/tomato.png"
                alt="movie"
              />
            </div>
            <span class="content">IMDB: {movie.vote_average}</span>
          </li>
          <li>
            <div class="thumb">
              <img
                src="../../../../assets/images/movie/cake.png"
                alt="movie"
              />
            </div>
            <span class="content">{movie.vote_count}</span>
          </li>
        </ul>
        <div class="book-area">
          <div class="book-ticket">
            <div className="react-item">
              <a href="#0">
                <div class="thumb">
                  <img
                    src="../../../../assets/images/icons/heart.png"
                    alt="icons"
                  />
                </div>
              </a>
            </div>
            <div className="react-item mr-auto">
              <a href={`/starcinema/movie-schedule/${movie.id}`}>
                <div className="thumb">
                  <img
                    src="../../../../assets/images/icons/book.png"
                    alt="icons"
                  />
                </div>
                <span className="text-success" style={{ fontSize: "16px" }}>book ticket</span>
              </a>
            </div>
            <div className="react-item">
              <a href="#0" class="popup-video">
                <div class="thumb">
                  <img
                    src="../../../../assets/images/icons/play-button.png"
                    alt="icons"
                  />
                </div>
                <span style={{ fontSize: "16px" }}>watch trailer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItemList;
