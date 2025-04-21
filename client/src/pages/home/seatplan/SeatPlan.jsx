import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useUser } from "../../../context/UserContext";
import { fetchData, postData } from "../../../api/api";
import SeatMap from "../../../components/home/seat/SeatMap";
import { formatDatetoString, formatHour } from "../../../utils/formatDateHelper";
import CountDownHandle from "../../../components/home/countdown/CountDownHandle";
import backgroundURL from "/assets/images/banner/banner02.jpg";
import proceedURL from "/assets/images/movie/movie-bg-proceed.jpg";
import { useCurrentSeat } from "../../../context/SeatContext";
const SeatPlan = () => {
    const { user, isLoggedIn } = useUser();
    const { selectedSeats, setSelectedSeats, currentShowtimeId, setShowtimeId, userId, setUserID, fetchHeldSeats } = useCurrentSeat();
    const { theaterId, showtimeId } = useParams();
    const [showtime, setShowtime] = useState('');
    const [theater, setTheater] = useState(null);
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn || !user) {
            navigate("/login");
            return;
        }
        if (user.id !== userId || !currentShowtimeId) {
            setUserID(user.id);
            setShowtimeId(showtimeId);
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
        fetchHeldSeats({ showtimeId, userId: user.id });
    }, [showtimeId, user, setUserID]);
    const onClickBookedSeat = useCallback(async (e) => {
        e.preventDefault();
        if (selectedSeats.length === 0) {
            Swal.fire({
                text: 'Please select a seat before proceeding to the next step.',
                icon: 'warning',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Okay',
            });
            return;
        }

        const { isConfirmed } = await Swal.fire({
            text: 'Do you really want to choose seats?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, choose it!',
            cancelButtonText: 'Cancel',
        });

        if (isConfirmed) {
            navigate(`/starcinema/service-options/${showtimeId}`);
        }
    }, [selectedSeats, navigate, showtimeId]);
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
                        <SeatMap screen={showtime?.screen} showtimeId={showtime?.id} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
                    </div>
                </div>
                <div className="proceed-book" style={{ backgroundImage: `url(${proceedURL})` }}>
                    <div className="proceed-to-book">
                        <div className="book-item">
                            <span>You have Choosed Seat</span>
                            <h3 className="title">{selectedSeats.map(seat => seat?.seat_name).join(", ")}</h3>
                        </div>
                        <div className="seat-type">
                            <span>Seat type</span>
                            <h3 className="title">
                                {[...new Set(selectedSeats.map(seat => seat?.seat_type))].join(", ")}
                            </h3>
                        </div>
                        <div className="book-item">
                            <span>total price</span>
                            <h3 className="title">
                                {selectedSeats.reduce((total, seat) => total + Number(seat?.seat_price), 0).toLocaleString()}Đ
                            </h3>

                        </div>
                        <div className="book-item">
                            <div className="custom-button" onClick={onClickBookedSeat}>proceed</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
};

export default SeatPlan;