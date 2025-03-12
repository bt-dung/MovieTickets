import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CountDownHandle from "../../../components/home/countdown/CountDownHandle";
import BannerTop from "../../../components/home/banner/BannerTop";
import CartBill from "../../../components/home/invoice/CartBill";
import { useCurrentSeat } from "../../../context/SeatContext";
import { useUser } from "../../../context/UserContext";
import MakePayment from "./MakePayment";
const FinalInvoice = () => {
    const { showtimeId } = useParams();
    const { user } = useUser();
    const { selectedSeats, setShowtimeId, setUserID, userId, selectedService, setSelectedService } = useCurrentSeat();
    const [showtime, setShowtime] = useState('');
    const [selectedPayment, setSelectedPayment] = useState("ScanQR");

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
    }, [showtimeId, user, setUserID]);
    const handleSelectPayment = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };

    const payOSConfig = {
        RETURN_URL: "http://localhost:5173/starcinema/payment-success",
        ELEMENT_ID: "payos-container",
        CHECKOUT_URL: "https://sandbox.payos.vn/checkout/your-checkout-id",
        embedded: true,
        onSuccess: (event) => {
            console.log("Payment successful!", event);
            alert("Thanh toán thành công!");
        },
        onCancel: (event) => {
            console.log("Payment cancelled.", event);
            alert("Bạn đã hủy thanh toán!");
        },
        onExit: (event) => {
            console.log("Payment interface closed.", event);
            alert("Bạn đã đóng giao diện thanh toán.");
        },
    };

    const onClickBookedSeat = (e) => {
        e.preventDefault();
        if (selectedSeats.length === 0) {
            Swal.fire({
                text: "Please select a seat before proceeding to the next step.",
                icon: "warning",
                confirmButtonColor: "#d33",
                confirmButtonText: "Okay",
            }).then(() => {
                navigate("/starcinema/home");
            });
            return;
        }
        return
    }
    return (<>
        <BannerTop title={"Invoice"} tags={["Tickets", "Foods", "Drinks"]} />
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
        <div class="movie-facility padding-bottom padding-top">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="checkout-widget checkout-contact">
                            <h5 class="title">Share your Contact  Details </h5>
                            <form class="checkout-contact-form">
                                <div class="form-group">
                                    <input type="text" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <input type="text" placeholder="Enter your Mail" />
                                </div>
                                <div class="form-group">
                                    <input type="text" placeholder="Enter your Phone Number " />
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Continue" class="custom-button" />
                                </div>
                            </form>
                        </div>
                        <div class="checkout-widget checkout-card mb-0">
                            <h5 class="title">Payment Option </h5>
                            <ul className="payment-option">
                                <li className={selectedPayment === "ScanQR" ? "active" : ""} onClick={() => handleSelectPayment("ScanQR")}>
                                    <a href="#0">
                                        <img src="/assets/images/payment/qrcode.png" alt="payment" />
                                        <span>ScanQR</span>
                                    </a>
                                </li>
                                <li className={selectedPayment === "Debit Card" ? "active" : ""} onClick={() => handleSelectPayment("Debit Card")}>
                                    <a href="#0">
                                        <img src="/assets/images/payment/card.png" alt="payment" />
                                        <span>Debit Card</span>
                                    </a>
                                </li>
                                <li className={selectedPayment === "Paypal" ? "active" : ""} onClick={() => handleSelectPayment("Paypal")}>
                                    <a href="#0">
                                        <img src="/assets/images/payment/paypal.png" alt="payment" />
                                        <span>Paypal</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="payment-description">
                                {selectedPayment === "ScanQR" && (
                                    <>
                                        <div className="payment-bubble">
                                            <h2>PAYOS</h2>
                                            <h5>Use your mobile banking app to scan the QR code and complete your payment instantly.</h5>
                                        </div>
                                    </>
                                )}
                                {selectedPayment === "Debit Card" && (
                                    <>
                                        <div className="payment-bubble">
                                            <h5>Log in to your PayPal account to make a payment quickly and securely.</h5>
                                        </div>
                                    </>
                                )}
                                {selectedPayment === "Paypal" && (
                                    <>
                                        <div className="payment-bubble">
                                            <h5>Log in to your PayPal account to make a payment quickly and securely.</h5>
                                        </div>
                                    </>

                                )}
                            </div>
                            <div className="custom-button" onClick={onClickBookedSeat}>MAKE PAYMENT</div>
                            <MakePayment payOSConfig={payOSConfig} />
                            <p class="notice">
                                By Clicking "Make Payment" you agree to the <a href="#0">terms and conditions</a>
                            </p>
                        </div>
                    </div>
                    <CartBill selectedSeats={selectedSeats} showtime={showtime} selectedService={selectedService} setSelectedService={setSelectedService} />
                </div>
            </div>
        </div>
    </>)
};
export default FinalInvoice;