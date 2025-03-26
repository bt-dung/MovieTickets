import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../../api/api";

const DetailMovie = () => {
  const [movieInfo, setMovieInfo] = useState({});

  const { movieId } = useParams();

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        const res = await fetchData(`/admin/movie/${movieId}/details-movie`);
        setMovieInfo(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching detail movie:", error);
      }
    };

    fetchDetailMovie();
    console.log("movieId");
  }, []);

  function formatMinutesToHours(minutes) {
    if (typeof minutes !== "number" || minutes < 0) return "Invalid input";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} hrs and ${remainingMinutes} mins`;
    } else if (hours > 0) {
      return `${hours} hrs`;
    } else {
      return `${remainingMinutes} mins`;
    }
  }

  return (
    <>
      <section className="details-banner bg_img" style={{ backgroundImage: `url(${movieInfo.img_bg})` }}>
        <div class="container">
          <div class="details-banner-wrapper">
            <div class="details-banner-thumb">
              <img src={movieInfo.img_poster} alt="movie" />
              <a href="" class="video-popup">
                <img
                  src="../../../assets/images/movie/video-button.png"
                  alt="movie"
                />
              </a>
            </div>
            <div class="details-banner-content offset-lg-3">
              <h3 class="title">{movieInfo.title}</h3>
              <div class="tags">
                <a href="#0">{movieInfo.original_language}</a>
              </div>
              {movieInfo?.genres?.map((genre) => {
                return (
                  <a
                    href=""
                    class="button"
                    key={genre.id}
                    style={{ marginRight: "10px" }}
                  >
                    {genre.name}
                  </a>
                );
              })}
              <div class="social-and-duration">
                <div class="duration-area">
                  <div class="item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>{movieInfo.release_date}</span>
                  </div>
                  <div class="item">
                    <i class="far fa-clock"></i>
                    <span>
                      {formatMinutesToHours(movieInfo?.detail_movie?.runtime)}
                    </span>
                  </div>
                </div>
                <ul class="social-share">
                  <li>
                    <a href="#0">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="book-section bg-one">
        <div class="container">
          <div class="book-wrapper offset-lg-3">
            <div class="left-side">
              <div class="item">
                <div class="item-header">
                  <div class="thumb">
                    <img
                      src="../../../assets/images/movie/tomato2.png"
                      alt="movie"
                    />
                  </div>
                  <div class="counter-area">
                    <span
                      class="counter-item odometer"
                      data-odometer-final={movieInfo.vote_average}
                    >
                      {movieInfo.vote_average}
                    </span>
                  </div>
                </div>
                <p>tomatometer</p>
              </div>
              <div class="item">
                <div class="item-header">
                  <div class="thumb">
                    <img
                      src="../../../assets/images/movie/cake2.png"
                      alt="movie"
                    />
                  </div>
                  <div class="counter-area">
                    <span
                      class="counter-item odometer"
                      data-odometer-final={movieInfo.vote_count}
                    >
                      {movieInfo.vote_count}
                    </span>
                  </div>
                </div>
                <p>audience Score</p>
              </div>
            </div>
            <div class="custom-button" style={{ cursor: "pointer" }}>
              <a href={`/starcinema/movie-schedule/${movieId}`} style={{ color: "white" }}>book tickets</a>
            </div>
          </div>
        </div>
      </section>

      <section class="movie-details-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center flex-wrap-reverse mb--50">
            <div class="col-lg-3 col-sm-10 col-md-6 mb-50">
              <div class="widget-1 widget-tags">
                <ul style={{ display: "block" }}>
                  <li>
                    <a href="#0">2D</a>
                  </li>
                  <li>
                    <a href="#0">imax 2D</a>
                  </li>
                  <li>
                    <a href="#0">4DX</a>
                  </li>
                </ul>
              </div>
              <div class="widget-1 widget-offer">
                <h3 class="title">Applicable offer</h3>
                <div class="offer-body">
                  <div class="offer-item">
                    <div class="thumb">
                      <img
                        src="../../../assets/images/sidebar/offer01.png"
                        alt="sidebar"
                      />
                    </div>
                    <div class="content">
                      <h6>
                        <a href="#0">Amazon Pay Cashback Offer</a>
                      </h6>
                      <p>Win Cashback Upto Rs 300*</p>
                    </div>
                  </div>
                  <div class="offer-item">
                    <div class="thumb">
                      <img
                        src="../../../assets/images/sidebar/offer02.png"
                        alt="sidebar"
                      />
                    </div>
                    <div class="content">
                      <h6>
                        <a href="#0">PayPal Offer</a>
                      </h6>
                      <p>
                        Transact first time with Paypal and get 100% cashback up
                        to Rs. 500
                      </p>
                    </div>
                  </div>
                  <div class="offer-item">
                    <div class="thumb">
                      <img
                        src="../../../assets/images/sidebar/offer03.png"
                        alt="sidebar"
                      />
                    </div>
                    <div class="content">
                      <h6>
                        <a href="#0">HDFC Bank Offer</a>
                      </h6>
                      <p>
                        Get 15% discount up to INR 100* and INR 50* off on F&B
                        T&C apply
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="widget-1 widget-banner">
                <div class="widget-1-body">
                  <a href="#0">
                    <img
                      src="../../../assets/images/banner/banner13.jpg"
                      alt="banner"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-9 mb-50">
              <div class="movie-details">
                <div class="tab summery-review">
                  <ul class="tab-menu">
                    <li class="active">Overview</li>
                  </ul>
                  <div class="tab-area">
                    <div class="tab-item active">
                      <p style={{ color: "white" }}>{movieInfo.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default DetailMovie;
