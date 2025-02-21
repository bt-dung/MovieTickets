import React from "react";

const MovieItem = () => {
  return (
    <div class="item" style={{border: "1px solid white"}}>
      <div class="movie-grid">
        <div class="movie-thumb c-thumb">
          <a href="#0">
            <img src="assets/images/movie/movie01.jpg" alt="movie" />
          </a>
        </div>
        <div class="movie-content bg-one">
          <h5 class="title m-0">
            <a href="#0">alone</a>
          </h5>
          <ul class="movie-rating-percent">
            <li>
              <div class="thumb">
                <img src="assets/images/movie/tomato.png" alt="movie" />
              </div>
              <span class="content">88%</span>
            </li>
            <li>
              <div class="thumb">
                <img src="assets/images/movie/cake.png" alt="movie" />
              </div>
              <span class="content">88%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
