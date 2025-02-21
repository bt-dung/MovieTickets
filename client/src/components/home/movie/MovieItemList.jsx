import React from "react";

const MovieItemList = ({ movie }) => {
  console.log("movie: ", movie);
  return (
    <div className="movie-list">
      <div class="movie-list">
        <div class="movie-thumb c-thumb">
          <a
            href="movie-details.html"
            class="w-100 bg_img h-100"
            data-background={""}
          >
            <img src={movie.img_poster} alt={movie.title} />
          </a>
        </div>
        <div class="movie-content bg-one">
          <h5 class="title">
            <a href="">{movie.title}</a>
          </h5>
          {/* <p class="duration">2hrs 50 min</p> */}
          <div class="movie-tags">
            <a href="#0">action</a>
            <a href="#0">adventure</a>
            <a href="#0">fantasy</a>
          </div>
          <div class="release">
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
              <div class="react-item">
                <a href="#0">
                  <div class="thumb">
                    <img src="../../../../assets/images/icons/heart.png" alt="icons" />
                  </div>
                </a>
              </div>
              <div class="react-item mr-auto">
                <a href="#0">
                  <div class="thumb">
                    <img src="../../../../assets/images/icons/book.png" alt="icons" />
                  </div>
                  <span>book ticket</span>
                </a>
              </div>
              <div class="react-item">
                <a href="#0" class="popup-video">
                  <div class="thumb">
                    <img
                      src="../../../../assets/images/icons/play-button.png"
                      alt="icons"
                    />
                  </div>
                  <span>watch trailer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItemList;
