import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../api/api';
import CountDownHandle from '../../../components/home/countdown/CountDownHandle';
import ProductFilter from '../../../components/home/product/ProductFilter';
import { useCurrentSeat } from '../../../context/SeatContext';
import { useUser } from '../../../context/UserContext';
import CartBill from '../../../components/home/invoice/CartBill';
import BannerTop from '../../../components/home/banner/BannerTop';
const ServiceOptions = () => {
    const navigate = useNavigate();
    const { showtimeId } = useParams();
    console.log(showtimeId);
    const { user } = useUser();
    console.log(user);
    const { selectedSeats, setShowtimeId, setUserID, userId, selectedService, setSelectedService, fetchHeldSeats } = useCurrentSeat();
    const [showtime, setShowtime] = useState('');
    const [totalAmount, setAmount] = useState(0);
    useEffect(() => {
        if (user.id !== userId) {
            setUserID(user.id);
            setShowtimeId(showtimeId);
        }
        const fetchShowtime = async (showtime_id) => {
            try {
                const res = await fetchData(`/api/v1/showtime/${showtime_id}`);
                console.log("showtime:", res.data);
                setShowtime(res.data);
            } catch (error) {
                console.error("Error fetching showtime data:", error);
            }
        }
        fetchShowtime(showtimeId);
        fetchHeldSeats(showtimeId, user.id);
    }, [showtimeId, user, setUserID]);

    return (<>
        <BannerTop title={"Services"} tags={['Foods', 'Drinks']} />
        <section className="page-title bg-one">
            <div className="container-xxl">
                <div class="page-title-area">
                    <div className="item md-order-1">
                        <button className="custom-button back-button" onClick={() => navigate(`/starcinema/theater/${showtime?.screen?.theater_id}/choose-seat/${showtime?.id}/`)}>
                            <i className="flaticon-double-right-arrows-angles" style={{ fontSize: "20px" }}></i> Back
                        </button>
                    </div>
                    <div class="item">
                        <h5 class="title">Seat holding times:</h5>
                        <CountDownHandle />
                        <h5>Mins Left</h5>
                    </div>
                </div>
            </div>
        </section>
        <div className="movie-facility padding-bottom padding-top">
            <div className="container-xxl">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="c-thumb padding-bottom">
                            <img src="https://static.vecteezy.com/system/resources/previews/021/850/617/non_2x/realistic-cinema-poster-vector.jpg" alt="sidebar/banner" style={{ height: "250px" }} />
                        </div>
                        <div class="section-header-3">
                            <span class="cate">You're hungry</span>
                            <h2 class="title">we have food</h2>
                            <p style={{ color: "white", fontWeight: "bold" }}>Prebook Your Meal and Save More!</p>
                        </div>
                        <ProductFilter setSelectedService={setSelectedService} />
                    </div>
                    <CartBill selectedSeats={selectedSeats} showtime={showtime} selectedService={selectedService} setSelectedService={setSelectedService} totalAmount={totalAmount} setAmount={setAmount} />
                </div>
            </div>
        </div>
    </>);
};
export default ServiceOptions;
