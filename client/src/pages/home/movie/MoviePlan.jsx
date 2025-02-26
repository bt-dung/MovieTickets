import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterSection from "../../../components/home/movie/FilterSection";
import { fetchData } from "../../../api/api";
import { getUpcomingDates } from "../../../utils/dateTimeHelper";
const MoviePlan = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [movie_schedule, setSchedule] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [selectedTheaterID, setSelectedTheaterID] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCityID, setSelectedCityID] = useState('');
    const [selectedDate, setDate] = useState('');
    const [dateTime, setDateTime] = useState(getUpcomingDates(5));
    console.log(dateTime);
    useEffect(() => {
        const getMovie = async (movieId) => {
            try {
                const res = await fetchData(`/admin/movies/${movieId}`);
                console.log(res);
                setMovie(res);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }
        getMovie(movieId);
    }, [movieId]);
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
                const res = await fetchData(`/api/v1/theaters?areaId=${cityId}`);
                setTheaters(res.data);
            } catch (error) {
                console.error("Error fetching theaters:", error);
            }
        };
        getTheaters(selectedCityID);
    }, [selectedCityID]);
    return (
        <>
            {!movie ? (
                <div>Loading...</div>
            ) : (<>
                <section class="window-warning inActive">
                    <div class="lay"></div>
                    <div class="warning-item">
                        <h6 class="subtitle">Welcome! </h6>
                        <h4 class="title">Select Your Seats</h4>
                        <div class="thumb">
                            <img src="assets/images/movie/seat-plan.png" alt="movie" />
                        </div>
                        <a href="movie-seat-plan.html" class="custom-button seatPlanButton">Seat Plans<i class="fas fa-angle-right"></i></a>
                    </div>
                </section>
                <section class="details-banner hero-area bg_img" data-background={movie.img_bg}>
                    <div className="container">
                        <div className="details-banner-wrapper">
                            <div className="details-banner-content">
                                <h3 className="title">{movie?.title || 'Movie Title'}</h3>

                                <div className="tags">
                                    {movie?.genres?.map((genre) => (
                                        <a href="#0" key={genre.id}>{genre.name}</a>
                                    ))}
                                </div></div>
                        </div>
                    </div>
                </section>
                <section class="book-section bg-one">
                    <div class="container-xl">
                        <div className="filter-container">
                            <div className="filter-group">
                                <FilterSection
                                    iconURL="/assets/images/ticket/city.png"
                                    labelName="City"
                                    options={cities}
                                    selectedValue={selectedCityID}
                                    onChange={(e) => setSelectedCityID(e.target.value)}
                                    placeholder="--- Choose City ---"
                                />
                                <FilterSection
                                    iconURL="/assets/images/ticket/cinema.png"
                                    labelName="Theater"
                                    options={theaters}
                                    selectedValue={selectedTheaterID}
                                    onChange={(e) => setSelectedTheaterID(e.target.value)}
                                    placeholder="--- Choose Theater ---"
                                />
                                <FilterSection
                                    iconURL="/assets/images/movie/date.png"
                                    labelName="Date"
                                    options={dateTime}
                                    selectedValue={selectedDate}
                                    onChange={(e) => setDate(e.target.value)}
                                    defaultvalue={dateTime[0]}
                                    placeholder="--- Choose Date ---"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="ticket-plan-section padding-bottom padding-top">
                    <div className="container-xxl">
                        <div className="row justify-content-center">
                            <div class="col-lg-9 mb-5 mb-lg-0">
                                <ul class="seat-plan-wrapper bg-five">
                                    <li>
                                        <div class="movie-name">
                                            <div class="icons">
                                                <i class="far fa-heart"></i>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <a href="#0" class="name">Genesis Cinema</a>
                                            <div class="location-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div class="movie-schedule">
                                            <div class="item">
                                                09:40
                                            </div>
                                            <div class="item">
                                                13:45
                                            </div>
                                            <div class="item">
                                                15:45
                                            </div>
                                            <div class="item">
                                                19:50
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="movie-name">
                                            <div class="icons">
                                                <i class="far fa-heart"></i>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <a href="#0" class="name">the beach</a>
                                            <div class="location-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div class="movie-schedule">
                                            <div class="item">
                                                09:40
                                            </div>
                                            <div class="item">
                                                13:45
                                            </div>
                                            <div class="item">
                                                15:45
                                            </div>
                                            <div class="item">
                                                19:50
                                            </div>
                                        </div>
                                    </li>
                                    <li class="active">
                                        <div class="movie-name">
                                            <div class="icons">
                                                <i class="far fa-heart"></i>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <a href="#0" class="name">city work</a>
                                            <div class="location-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div class="movie-schedule">
                                            <div class="item">
                                                09:40
                                            </div>
                                            <div class="item active">
                                                13:45
                                            </div>
                                            <div class="item">
                                                15:45
                                            </div>
                                            <div class="item">
                                                19:50
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="movie-name">
                                            <div class="icons">
                                                <i class="far fa-heart"></i>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <a href="#0" class="name">box park</a>
                                            <div class="location-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div class="movie-schedule">
                                            <div class="item">
                                                09:40
                                            </div>
                                            <div class="item">
                                                13:45
                                            </div>
                                            <div class="item">
                                                15:45
                                            </div>
                                            <div class="item">
                                                19:50
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="movie-name">
                                            <div class="icons">
                                                <i class="far fa-heart"></i>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <a href="#0" class="name">la mer</a>
                                            <div class="location-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div class="movie-schedule">
                                            <div class="item">
                                                09:40
                                            </div>
                                            <div class="item">
                                                13:45
                                            </div>
                                            <div class="item">
                                                15:45
                                            </div>
                                            <div class="item">
                                                19:50
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="movie-name">
                                            <div class="icons">
                                                <i class="far fa-heart"></i>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <a href="#0" class="name">wanted</a>
                                            <div class="location-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div class="movie-schedule">
                                            <div class="item">
                                                09:40
                                            </div>
                                            <div class="item">
                                                13:45
                                            </div>
                                            <div class="item">
                                                15:45
                                            </div>
                                            <div class="item">
                                                19:50
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-10">
                                <div class="widget-1 widget-banner">
                                    <div class="widget-1-body">
                                        <a href="#0">
                                            <img src="/assets/images/sidebar/banner/banner03.jpg" alt="banner" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>
            )}</>
    );
};

export default MoviePlan;