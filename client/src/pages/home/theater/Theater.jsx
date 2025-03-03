import { fetchData } from "../../../api/api";
import FilterSection from "../../../components/home/movie/FilterSection";
import { useEffect, useState } from "react";
import imageURL from "/assets/images/banner/banner02.jpg";
import searchURL from "/assets/images/ticket/ticket-bg01.jpg";

const Theater = () => {
  const [theaters, setTheaters] = useState([]);
  const [selectedTheaterID, setSelectedTheaterID] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCityID, setSelectedCityID] = useState("");
  const [detailTheater, setTheater] = useState(null);
  const [movieShowing, setMovieShowing] = useState([]);

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
    const getInfoTheater = async (theaterId) => {
      try {
        console.log("theater:", selectedTheaterID);
        const res = await fetchData(`/api/v1/theaters/${theaterId}`);
        const movieTheater = await fetchData(
          `/api/v1/movies-theater/${theaterId}`
        );
        console.log(res);
        console.log(movieTheater);
        setMovieShowing(movieTheater.data);
        setTheater(res);
      } catch (error) {
        console.error("Error fetching detail theater:", error);
      }
    };
    getInfoTheater(selectedTheaterID);
  }, [selectedTheaterID]);
  return (
    <>
      <section className="banner-section">
        <div
          className="banner-bg bg_img bg-fixed"
          style={{ backgroundImage: `url(${imageURL})` }}
        ></div>
        <div className="container">
          <div
            className="search-tab bg_img"
            style={{ backgroundImage: `url(${searchURL})` }}
          >
            <div className="row align-items-center mb--20">
              <div className="col-lg-6 mb-20">
                <div className="search-ticket-header">
                  <h6 className="category">Welcome to Boleto</h6>
                  <h3 className="title">What are you looking for?</h3>
                </div>
              </div>
              <div className="col-lg-6 mb-20">
                <ul className="tab-menu ticket-tab-menu">
                  <li className="active">
                    <div className="tab-logo">
                      <img
                        src="/assets/images/ticket/movie-theater.png"
                        alt="ticket"
                      />
                    </div>
                    <span>Theater</span>
                  </li>
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
        <div className="container padding-top padding-bottom">
          {!detailTheater ? (
            <h2 className="text-center text-danger">
              Please select the city and theater you want to book tickets for.
            </h2>
          ) : (
            <>
              <div className="row flex-wrap-reverse justify-content-center">
                <div className="col-sm-10 col-md-8 col-lg-3">
                  <div className="theater-banner">
                    <div className="theater-info">
                      <h4 className="theater-name">{detailTheater.name}</h4>
                      <p className="theater-address">
                        Address: {detailTheater.address}
                      </p>
                      <p className="theater-time">
                        Opening hours: 8:00 AM - 11:00 PM
                      </p>
                      <p
                        className="theater-screen"
                        style={{ fontWeight: "bold" }}
                      >
                        Totals Screen | {detailTheater.total_screens} Screens
                      </p>
                      <p
                        className="theater-screen"
                        style={{ fontWeight: "bold" }}
                      >
                        Totals Seat | {detailTheater.total_seats} Seats
                      </p>
                      <a href="/theater-details" className="btn btn-primary">
                        Detail
                      </a>
                    </div>
                  </div>
                </div>
                <div className="movie-theater col-lg-9 mb-50 mb-lg-0">
                  <div className="title-page">
                    <h1>MOVIE SHOWING</h1>
                  </div>
                  <div className="filter-tab tab">
                    <div className="tab-area">
                      <div className="tab-item active">
                        <div className="row mb-10 justify-content-center">
                          {movieShowing.map((movie, index) => (
                            <div key={index} className="col-sm-6 col-lg-4">
                              <div className="movie-grid">
                                <div className="movie-thumb c-thumb">
                                  <a
                                    href={`/starcinema/movie-schedule/${movie.id}?areaId=${selectedCityID}&theaterId=${selectedTheaterID}`}
                                  >
                                    <img src={movie.img_poster} alt="movie" />
                                  </a>
                                </div>
                                <div className="movie-content bg-one">
                                  <h5 className="title m-0">
                                    <a
                                      href={`/starcinema/movie-schedule/${movie.id}?areaId=${selectedCityID}&theaterId=${selectedTheaterID}`}
                                    >
                                      {movie.title}
                                    </a>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Theater;
