import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { fetchData } from "../../../api/api";
import { formatDatetoString, formatHour } from "../../../utils/formatDateHelper";
import CountDownHandle from "../../../components/home/countdown/CountDownHandle";
import backgroundURL from "/assets/images/banner/banner04.jpg";
import proceedURL from "/assets/images/movie/movie-bg-proceed.jpg";

const SeatPlan = () => {
    const { user, isLoggedIn } = useUser();
    const { theaterId, showtimeId } = useParams();
    const [theater, setTheater] = useState(null);
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState(null);
    const [seatPlan, setSeat] = useState([]);
    useEffect(() => {
        if (!isLoggedIn || !user) {
            navigate("/login");
            return;
        }
        const fetchShowtime = async (showtime_id) => {
            try {
                const res = await fetchData(`/api/v1/showtime/${showtime_id}`);
                console.log("showtime:", res.data);
                setMovie(res.data.movie);
                setShowtime(res.data);
                const resTheater = await fetchData(`/api/v1/theaters/${theaterId}`);
                setTheater(resTheater);
            } catch (error) {
                console.error("Error fetching showtime data:", error);
            }
        }
        fetchShowtime(showtimeId);
    }, [isLoggedIn, user, navigate, showtimeId]);
    return (<>
        <section className="details-banner hero-area bg-img seat-plan-banner" style={{ backgroundImage: `url(${backgroundURL})` }}>
            <div className="container">
                <div className="details-banner-wrapper">
                    <div className="details-banner-content style-two">
                        <h3 className="title">{movie?.title}</h3>
                        <div className="tags">
                            <span>{theater?.name} </span>
                            <span>English - 2D</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="page-title bg-one">
            <div className="container-xxl">
                <div class="page-title-area">
                    <div className="item md-order-1">
                        <a href={`/starcinema/movie-schedule/${movie?.id}`} className="custom-button back-button">
                            <i class="flaticon-double-right-arrows-angles" style={{ fontSize: "20px" }}></i>back
                        </a>
                    </div>
                    <div class="item date-item">
                        <span class="date">{formatDatetoString(showtime?.date_time)}</span>
                        <span className="hour">{formatHour(showtime?.start_time)} ~ {formatHour(showtime?.end_time)}</span>
                    </div>
                    <div class="item">
                        <h5 class="title">Seat holding times:</h5>
                        <CountDownHandle />
                        <h5>Mins Left</h5>
                    </div>
                </div>
            </div>
        </section>

        <section className="seat-plan-section padding-bottom padding-top">
            <div className="container-xxl">
                <div class="screen-area">
                    <h4 class="screen">{showtime?.screen?.name}</h4>
                    <div className="screen-thumb">
                        <img src="/assets/images/movie/screen-thumb.png" alt="movie" />
                    </div>
                    <h5 class="subtitle">silver plus</h5>
                    <div class="screen-wrapper">
                        <ul class="seat-area">
                            <li class="seat-line">
                                <span>G</span>
                                <ul class="seat--area">
                                    <li class="front-seat">
                                        <ul>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="front-seat">
                                        <ul>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="front-seat">
                                        <ul>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span>G</span>
                            </li>
                            <li class="seat-line">
                                <span>f</span>
                                <ul class="seat--area">
                                    <li class="front-seat">
                                        <ul>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="front-seat">
                                        <ul>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat seat-free">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                                <span class="sit-num">f7</span>
                                            </li>
                                            <li class="single-seat seat-free">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                                <span className="sit-num">f8</span>
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="front-seat">
                                        <ul>
                                            <li class="single-seat seat-free">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                                <span class="sit-num">f9</span>
                                            </li>
                                            <li class="single-seat seat-free">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                                <span class="sit-num">f10</span>
                                            </li>
                                            <li class="single-seat seat-free">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                                <span class="sit-num">f11</span>
                                            </li>
                                            <li class="single-seat">
                                                <img src="/assets/images/movie/seat01.png" alt="seat" />
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span>f</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="proceed-book" style={{ backgroundImage: `url(${proceedURL})` }}>
                    <div class="proceed-to-book">
                        <div class="book-item">
                            <span>You have Choosed Seat</span>
                            <h3 class="title">d9, d10</h3>
                        </div>
                        <div class="book-item">
                            <span>total price</span>
                            <h3 class="title">$150</h3>
                        </div>
                        <div class="book-item">
                            <a href="movie-checkout.html" class="custom-button">proceed</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
};

export default SeatPlan;