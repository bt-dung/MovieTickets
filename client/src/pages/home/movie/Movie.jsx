import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { fetchData } from "../../../api/api";
import MovieItemList from "../../../components/home/movie/MovieItemList";
import MovieWidget from "../../../components/home/movie/MovieWidget";
import SearchContent from "../../../components/home/movie/SearchContent";
import FilterSection from "../../../components/home/movie/FilterSection";

const Movie = () => {
  const { user, isLoggedIn } = useUser();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isList, setIsList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityID, setSelectedCityID] = useState('');
  const [selectedTheaterID, setSelectedTheaterID] = useState('');

  useEffect(() => {
    const fetchNewRelease = async (page = 1) => {
      try {
        const resMovie = await fetchData(
          `/admin/movies?pageNumber=${page}&limit=8`
        );
        setMovies(resMovie.content);
        setTotalPages(resMovie.totalPages);
      } catch (error) {
        console.error("Error fetching new release:", error);
      }
    };

    fetchNewRelease(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchGetAllGenres = async () => {
      try {
        const res = await fetchData("/api/v1/genres");
        setGenres(res.data);
      } catch (error) {
        console.log("Error fetching genres: ", error);
      }
    };
    fetchGetAllGenres();
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setResults([]);
      return;
    }
    const fetchMovies = async () => {
      try {
        const response = await fetchData(
          `/admin/movies/search?search=${searchTerm}`
        );
        console.log("search:", response);
        setResults(response.content);
      } catch {
        setResults([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await fetchData("/api/v1/areas");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching area:", error);
      }
    };
    getCities();
  }, []);
  useEffect(() => {
    if (!selectedCityID) return;
    const getTheaters = async (cityId) => {
      try {
        console.log("city:", cityId);
        const res = await fetchData(`/api/v1/theaters?areaId=${cityId}`);
        setTheaters(res.data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };
    getTheaters(selectedCityID);
  }, [selectedCityID]);
  useEffect(() => {
    if (!selectedTheaterID) return;
    const getMovieInTheater = async (theaterId) => {
      try {
        const movieTheater = await fetchData(`/api/v1/movies-theater/${theaterId}`);
        console.log(movieTheater);
        setMovies(movieTheater.data);
        setTotalPages(1);
      } catch (error) {
        console.error("Error fetching detail theater:", error);
      }
    }
    getMovieInTheater(selectedTheaterID);
  }, [selectedTheaterID])

  return (
    <>
      {isLoggedIn && (
        <>
          <section className="banner-section">
            <div
              className="banner-bg bg_img bg-fixed"
              style={{ backgroundImage: "url('/assets/images/banner/banner01.jpg')" }}
            ></div>
            <div className="container">
              <div
                className="search-tab bg_img"
                style={{ backgroundImage: "url('/assets/images/ticket/ticket-bg01.jpg')" }}
              >
                <div className="row align-items-center mb--20">
                  <div className="col-lg-6 mb-20">
                    <div className="search-ticket-header">
                      <h4 className="category">welcome to Boleto</h4>
                      <h3 className="title">what are you looking for</h3>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-20">
                    <ul className="tab-menu ticket-tab-menu">
                      <li className="active">
                        <div className="tab-logo">
                          <img
                            src="../../../assets/images/ticket/video-player.png"
                            alt="ticket"
                            style={{ width: "50px" }}
                          />
                        </div>
                        <span>Movie</span>
                      </li>
                      <div className="search-container">
                        <form className="ticket-search-form">
                          <div className="form-group large">
                            <input
                              type="text"
                              placeholder="Search for Movie"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                              <button
                                type="button"
                                className="clear-btn"
                                onClick={() => setSearchTerm("")}
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        </form>
                        {searchTerm && <SearchContent results={results} />}
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="filter-container">
                  <div className="filter-group">
                    <FilterSection
                      iconURL="../../../../assets/images/ticket/city.png"
                      labelName="City"
                      options={cities}
                      selectedValue={selectedCityID}
                      onChange={(e) => setSelectedCityID(e.target.value)}
                      placeholder="--- Choose City ---"
                    />
                    <FilterSection
                      iconURL="../../../../assets/images/ticket/cinema.png"
                      labelName="Theater"
                      options={theaters}
                      selectedValue={selectedTheaterID}
                      onChange={(e) => setSelectedTheaterID(e.target.value)}
                      placeholder="--- Choose Theater ---"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="movie-section padding-top padding-bottom">
            <div className="container-xxl">
              <div className="row flex-wrap-reverse justify-content-center">
                <div className="col-sm-10 col-md-8 col-lg-3">
                  <MovieWidget genres={genres} />
                </div>
                <div class="col-lg-9 mb-50 mb-lg-0">
                  <div class="filter-tab tab">
                    <div class="filter-area">
                      <div class="filter-main">
                        <div class="left">
                          <div class="item">
                            <span class="show">Show :</span>
                            <select class="select-bar">
                              <option value="12">12</option>
                              <option value="15">15</option>
                              <option value="18">18</option>
                              <option value="21">21</option>
                              <option value="24">24</option>
                              <option value="27">27</option>
                              <option value="30">30</option>
                            </select>
                          </div>
                          <div class="item">
                            <span class="show">Sort By :</span>
                            <select class="select-bar">
                              <option value="showing">now showing</option>
                              <option value="exclusive">exclusive</option>
                              <option value="trending">trending</option>
                              <option value="most-view">most view</option>
                            </select>
                          </div>
                        </div>
                        <ul class="grid-button tab-menu">
                          <li>
                            <i class="fas fa-th"></i>
                          </li>
                          <li>
                            <i class="fas fa-bars"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="tab-area">
                      {/* <div class="tab-item">
                                <div class="row mb-10 justify-content-center">
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie01.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">alone</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie02.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">mars</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie03.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">venus</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie04.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">on watch</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie05.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">fury</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie06.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">trooper</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie07.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">horror night</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie08.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">the lost name</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie09.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">calm stedfast</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie10.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">criminal on party</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie11.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">halloween party</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-lg-4">
                                        <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                                <a href="movie-details.html">
                                                    <img src="assets/images/movie/movie12.jpg" alt="movie">
                                                </a>
                                            </div>
                                            <div class="movie-content bg-one">
                                                <h5 class="title m-0">
                                                    <a href="movie-details.html">the most wanted</a>
                                                </h5>
                                                <ul class="movie-rating-percent">
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/tomato.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                    <li>
                                                        <div class="thumb">
                                                            <img src="assets/images/movie/cake.png" alt="movie">
                                                        </div>
                                                        <span class="content">88%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                      <div class="tab-item active">
                        <div class="movie-area mb-10">
                          {movies.length > 0 ? (
                            movies.map((movie) => (
                              <MovieItemList key={movie.id} movie={movie} />
                            ))
                          ) : (
                            <p>Loading movies...</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="pagination-area text-center">
                      <a
                        href="#0"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "disabled" : ""}
                      >
                        <i className="fas fa-angle-double-left"></i>
                        <span>Prev</span>
                      </a>
                      {[...Array(totalPages).keys()].map((pageNumber) => (
                        <a
                          key={pageNumber + 1}
                          href="#0"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber + 1);
                          }}
                          className={
                            currentPage === pageNumber + 1 ? "active" : ""
                          }
                        >
                          {pageNumber + 1}
                        </a>
                      ))}

                      <a
                        href="#0"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "disabled" : ""}
                      >
                        <span>Next</span>
                        <i className="fas fa-angle-double-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Movie;
