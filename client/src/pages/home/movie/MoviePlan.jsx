import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import FilterSection from "../../../components/home/movie/FilterSection";
import { fetchData } from "../../../api/api";
import { getUpcomingDates } from "../../../utils/dateTimeHelper";
import { FormatDate } from "../../../utils/formatDateHelper";
import ScheduleItem from "../../../components/home/schedule/ScheduleItem";
import { groupShowtimesByMovie } from "../../../utils/groupShowtimesByMovie";
const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
};
const MoviePlan = () => {
    const query = useQueryParams();
    const areaId = query.get("areaId");
    const theaterId = query.get("theaterId");
    const [dateTime, setDateTime] = useState([]);
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [movie_schedule, setSchedule] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [selectedTheaterID, setSelectedTheaterID] = useState(theaterId || '');
    const [cities, setCities] = useState([]);
    const [selectedCityID, setSelectedCityID] = useState(areaId || '');
    const [selectedDate, setDate] = useState(FormatDate(Date.now()));
    const [detailTheater, setTheater] = useState(null);

    useEffect(() => {
        const getMovie = async (movieId) => {
            try {
                const res = await fetchData(`/admin/movies/${movieId}`);
                setMovie(res);
                const areas = await fetchData("/api/v1/areas");
                setCities(areas.data);
                setDateTime(getUpcomingDates(5));
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }
        getMovie(movieId);
    }, [movieId]);

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

    useEffect(() => {
        const getShowtimeforMovie = async (selectedTheaterID, movieId, selectedDate) => {
            try {
                let res;
                if (!selectedTheaterID) {
                    res = await fetchData(`/api/v1/movie/${movieId}/showtimes/${selectedDate}`);
                } else {
                    const resTheater = await fetchData(`/api/v1/theaters/${selectedTheaterID}`);
                    setTheater(resTheater);
                    res = await fetchData(`/api/v1/theater/${selectedTheaterID}/movie/${movieId}/showtimes/${selectedDate}`);
                };
                console.log("showtime2", groupShowtimesByMovie(res.data));
                const allSchedule = groupShowtimesByMovie(res.data)
                setSchedule(allSchedule);
            } catch (error) {
                console.error("Error fetching theaters:", error);
            }
        };
        getShowtimeforMovie(selectedTheaterID, movieId, selectedDate);
    }, [selectedTheaterID, selectedDate]);

    return (
        <>
            {!movie ? (
                <div>Loading...</div>
            ) : (<>
                <section class="details-banner hero-area bg_img" style={{ backgroundImage: `url(${movie.img_bg})` }}>
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
                                    placeholder="--- Choose Date ---"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="ticket-plan-section padding-bottom padding-top">
                    <div className="container-xxl">
                        <div className="title-page">
                            <h1>MOVIE SHOWTIMES</h1>
                            {!detailTheater ? (<p>Film "${movie.title}"</p>) : (<p>Film "${movie.title}" at {detailTheater.name} - address: {detailTheater.address} on {selectedDate}.</p>)}

                        </div>
                        <div className="row justify-content-center">
                            <div class="col-lg-9 mb-5 mb-lg-0">
                                <ul class="seat-plan-wrapper bg-five">
                                    {!movie_schedule ? (<p className="text-center text-danger fs-5">The movie is not showing in theaters today.</p>) : (
                                        movie_schedule.theaters?.map((theater) => (
                                            <ScheduleItem key={theater.theater_id} schedules={theater} />
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-10">
                                <div class="widget-1 widget-banner">
                                    <div class="widget-1-body">
                                        <a href="#0">
                                            <img src="/assets/images/banner/banner12.jpg" alt="banner" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>
            )
            }</>
    );
};

export default MoviePlan;