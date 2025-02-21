import { useUser } from "../../context/UserContext";
import { fetchData } from "../../api/api";
import { useState, useEffect } from "react";
import SearchContent from "../../components/home/SearchContent";
import MovieItem from "../../components/home/MovieItem";

const Home = () => {
  const { user, isLoggedIn } = useUser();
  const [movieNewRelease, setNewRelease] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchNewRelease = async (page = 1) => {
      try {
        const response = await fetchData("/admin/movies/newRelease");
        const resMovie = await fetchData(`/admin/movies?pageNumber=${page}&limit=8`);
        setNewRelease(response);
        setMovies(resMovie.content);
        setTotalPages(resMovie.totalPages);
      } catch (error) {
        console.error("Error fetching new release:", error);
      }
    };

    fetchNewRelease(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % movieNewRelease.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movieNewRelease]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      setResults([]);
      return;
    }
    const fetchMovies = async () => {
      try {
        const response = await fetchData(`/admin/movies/search?search=${searchTerm}`);
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
  return (
    <>
      {isLoggedIn ? (
        <>
          <section className="banner-section">
            <div className="banner-bg bg_img bg-fixed" data-background="../../../assets/images/banner/banner01.jpg"></div>
            <div className="container">
              <div className="search-tab bg_img" data-background="../../../assets/images/ticket/ticket-bg01.jpg">
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
                          <img src="../../../assets/images/ticket/ticket-tab01.png" alt="ticket" />
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
                              <button type="button" className="clear-btn" onClick={() => setSearchTerm('')}>
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

              <div className="banner-content">
                <h2 className="title">New Films Release</h2>
                <div className="banner-images">
                  {movieNewRelease.length > 0 ? (
                    <div className="banner-item active">
                      <img
                        key={currentBannerIndex}
                        src={movieNewRelease[currentBannerIndex].img_bg}
                        alt="New Movie Release"
                        className="banner-img"
                      />
                      <p>
                        {movieNewRelease[currentBannerIndex].title}
                      </p>
                    </div>
                  ) : (
                    <p>Loading images...</p>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section class="movie-section padding-top padding-bottom">
            <div class="container">
              <div class="tab">
                <div class="section-header-2">
                  <div class="left">
                    <h2 className="title" style={{ fontSize: "50px" }}>movies</h2>
                    <p style={{ color: "white", fontSize: "16px" }}>Be sure not to miss these Movies today.</p>
                  </div>
                  <ul class="tab-menu">
                    <li class="active" style={{ color: "white" }}>
                      now showing
                    </li>
                    <li style={{ color: "white" }}>
                      coming soon
                    </li>
                    <li style={{ color: "white" }}>
                      exclusive
                    </li>
                  </ul>
                </div>
                <div class="tab-area mb-30-none">
                  <div class="tab-item active">
                    {movies.length > 0 ? (
                      movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
                    ) : (
                      <p>Loading movies...</p>
                    )}
                    <div className="pagination-area text-center">
                      <a
                        href="#0"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "disabled" : ""}
                      >
                        <i className="fas fa-angle-double-left"></i><span>Prev</span>
                      </a>
                      {[...Array(totalPages).keys()].map((pageNumber) => (
                        <a
                          key={pageNumber + 1}
                          href="#0"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber + 1);
                          }}
                          className={currentPage === pageNumber + 1 ? "active" : ""}
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
                        <span>Next</span><i className="fas fa-angle-double-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </>
      ) : (
        <h1>Please log in.</h1>
      )}
    </>
  );
};

export default Home;
