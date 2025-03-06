import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountDownHandle from '../../../components/home/countdown/CountDownHandle';
import BackgroundURL from "/assets/images/banner/banner04.jpg";
import ProductFilter from '../../../components/home/product/ProductFilter';
import { useCurrentSeat } from '../../../context/SeatContext';
import CartBill from '../../../components/home/invoice/CartBill';
const ServiceOptions = () => {
    const { selectedSeats, showtime, invoice } = useCurrentSeat();
    const { invoiceId } = useParams();
    console.log(selectedSeats, showtime);
    const [selectedService, setSelectedService] = useState([]);
    useEffect(() => {
        console.log("Product selected: ", selectedService);
    }, [selectedService]);
    return (<>
        <section className="details-banner hero-area seat-plan-banner" style={{ backgroundImage: `url(${BackgroundURL})` }}>
            <div className="container">
                <div className="details-banner-wrapper">
                    <div class="details-banner-content style-two">
                        <h3 className="title">Services</h3>
                        <div className="tags">
                            <a href="#0">Foods</a>
                            <a href="#0">Drinks</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="page-title bg-one">
            <div className="container-xxl">
                <div class="page-title-area">
                    <div className="item md-order-1">
                        <button className="custom-button back-button" onClick={() => window.history.back()}>
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
                    <CartBill selectedSeats={selectedSeats} showtime={showtime} invoice={invoice} selectedService={selectedService} />
                </div>
            </div>
        </div>
    </>);
};
export default ServiceOptions;
