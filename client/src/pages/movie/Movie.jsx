import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchData } from "../../api/api";
import MovieItemList from "../../components/home/movie/MovieItemList";
import MovieWidget from "../../components/home/movie/MovieWidget";
import SearchContent from "../../components/home/movie/SearchContent";

const Movie = () => {
  const { user, isLoggedIn } = useUser();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isList, setIsList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchNewRelease = async (page = 1) => {
      try {
        const response = await fetchData("/admin/movies/newRelease");
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <section className="banner-section" style={{ marginBottom: "100px" }}>
            <div
              className="banner-bg bg_img bg-fixed"
              data-background="../../../assets/images/banner/banner01.jpg"
              style={{ height: "450px" }}
            ></div>
            <div className="container">
              <div
                className="search-tab bg_img"
                data-background="../../../assets/images/ticket/ticket-bg01.jpg"
              >
                <div className="row align-items-center mb--20">
                  <div className="col-lg-6 mb-20">
                    <div className="search-ticket-header">
                      <h6 className="category">welcome to Boleto</h6>
                      <h3 className="title">what are you looking for</h3>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-20">
                    <ul className="tab-menu ticket-tab-menu">
                      <li className="active">
                        <div className="tab-logo">
                          <img
                            src="../../../assets/images/ticket/ticket-tab01.png"
                            alt="ticket"
                          />
                        </div>
                        <span>movie</span>
                      </li>
                      <div className="search-container">
                        <form className="ticket-search-form">
                          <div className="form-group large">
                            <input
                              type="text"
                              placeholder="Search for Movies"
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
              </div>
            </div>
          </section>

          {/* <section class="search-ticket-section padding-top pt-lg-0">
            <div class="container">
              <div
                class="search-tab bg_img"
                data-background="assets/images/ticket/ticket-bg01.jpg"
              >
                <div class="row align-items-center mb--20">
                  <div class="col-lg-6 mb-20">
                    <div class="search-ticket-header">
                      <h6 class="category">welcome to Boleto </h6>
                      <h3 class="title">what are you looking for</h3>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-20">
                    <ul class="tab-menu ticket-tab-menu">
                      <li class="active">
                        <div class="tab-thumb">
                          <img
                            src="assets/images/ticket/ticket-tab01.png"
                            alt="ticket"
                          />
                        </div>
                        <span>movie</span>
                      </li>
                      <li>
                        <div class="tab-thumb">
                          <img
                            src="assets/images/ticket/ticket-tab02.png"
                            alt="ticket"
                          />
                        </div>
                        <span>events</span>
                      </li>
                      <li>
                        <div class="tab-thumb">
                          <img
                            src="assets/images/ticket/ticket-tab03.png"
                            alt="ticket"
                          />
                        </div>
                        <span>sports</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="tab-area">
                  <div class="tab-item active">
                    <form class="ticket-search-form">
                      <div class="form-group large">
                        <input type="text" placeholder="Search fo Movies" />
                        <button type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/city.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">city</span>
                        <select class="select-bar">
                          <option value="london">London</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/date.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">date</span>
                        <select class="select-bar">
                          <option value="26-12-19">23/10/2020</option>
                          <option value="26-12-19">24/10/2020</option>
                          <option value="26-12-19">25/10/2020</option>
                          <option value="26-12-19">26/10/2020</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/cinema.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">cinema</span>
                        <select class="select-bar">
                          <option value="Awaken">Awaken</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div class="tab-item">
                    <form class="ticket-search-form">
                      <div class="form-group large">
                        <input type="text" placeholder="Search fo Events" />
                        <button type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/city.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">city</span>
                        <select class="select-bar">
                          <option value="london">London</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/date.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">date</span>
                        <select class="select-bar">
                          <option value="26-12-19">23/10/2020</option>
                          <option value="26-12-19">24/10/2020</option>
                          <option value="26-12-19">25/10/2020</option>
                          <option value="26-12-19">26/10/2020</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/cinema.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">event</span>
                        <select class="select-bar">
                          <option value="angular">angular</option>
                          <option value="startup">startup</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="Last-First">Last-First</option>
                          <option value="wish">wish</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div class="tab-item">
                    <form class="ticket-search-form">
                      <div class="form-group large">
                        <input type="text" placeholder="Search fo Sports" />
                        <button type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/city.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">city</span>
                        <select class="select-bar">
                          <option value="london">London</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/date.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">date</span>
                        <select class="select-bar">
                          <option value="26-12-19">23/10/2020</option>
                          <option value="26-12-19">24/10/2020</option>
                          <option value="26-12-19">25/10/2020</option>
                          <option value="26-12-19">26/10/2020</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img
                            src="assets/images/ticket/cinema.png"
                            alt="ticket"
                          />
                        </div>
                        <span class="type">sports</span>
                        <select class="select-bar">
                          <option value="football">football</option>
                          <option value="cricket">cricket</option>
                          <option value="cabadi">cabadi</option>
                          <option value="madrid">madrid</option>
                          <option value="gadon">gadon</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section class="movie-section padding-top padding-bottom">
            <div class="container">
              <div class="row flex-wrap-reverse justify-content-center">
                <div class="col-sm-10 col-md-8 col-lg-3">
                  <MovieWidget />
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
