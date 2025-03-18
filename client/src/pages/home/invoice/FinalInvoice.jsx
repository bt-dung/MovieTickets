import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CountDownHandle from "../../../components/home/countdown/CountDownHandle";
import BannerTop from "../../../components/home/banner/BannerTop";
import CartBill from "../../../components/home/invoice/CartBill";
import { useCurrentSeat } from "../../../context/SeatContext";
import { useUser } from "../../../context/UserContext";
import { fetchData, postData } from "../../../api/api";

const FinalInvoice = () => {
    const navigate = useNavigate();
    const { showtimeId } = useParams();
    const { user } = useUser();
    const { selectedSeats, setShowtimeId, setUserID, userId, selectedService, setSelectedService, fetchHeldSeats } = useCurrentSeat();
    const [showtime, setShowtime] = useState('');
    const [selectedPayment, setSelectedPayment] = useState("");
    const [totalAmount, setAmount] = useState(0);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [numberphone, setNumberPhone] = useState('');
    const [emailError, setEmailError] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        if (user.id !== userId) {
            setUserID(user.id);
            setShowtimeId(showtimeId);
        }
        const fetchShowtime = async (showtime_id) => {
            try {
                const res = await fetchData(`/api/v1/showtime/${showtime_id}`);
                console.log(res.data);
                setShowtime(res.data);

                const userRes = await fetchData(`/admin/user/${user.id}`);
                console.log("user:", userRes);
                setUsername(userRes.name);
                setEmail(userRes.email);
                setNumberPhone(userRes.numberphone);
            } catch (error) {
                console.error("Error fetching showtime data:", error);
            }
        }
        fetchShowtime(showtimeId);
        fetchHeldSeats(showtimeId, user.id);
    }, [showtimeId, user, setUserID]);

    const handleSelectPayment = (paymentMethod) => {
        if (!isFormSubmitted) {
            Swal.fire({
                text: "Please click Continue before selecting payment method.",
                icon: "info",
                confirmButtonColor: "#d33",
                confirmButtonText: "Okay",
            });
            return;
        }
        setSelectedPayment(paymentMethod);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setEmailError("Email cannot be empty!");
            return;
        } else {
            setEmailError("");
        }
        setIsFormSubmitted(true);
    };

    const onClickBookedSeat = async (e) => {
        e.preventDefault();
        if (!isFormSubmitted) {
            Swal.fire({
                text: "Please confirm your information and choose your payment method before paying the bill !!",
                icon: "info",
                confirmButtonColor: "#3498db",
                confirmButtonText: "Okay",
            });
            return;
        };
        if (selectedPayment === "") {
            Swal.fire({
                text: "Please choose your payment method before paying the bill !!",
                icon: "info",
                confirmButtonColor: "#3498db",
                confirmButtonText: "Okay",
            });
            return;
        };
        if (selectedSeats.length === 0) {
            Swal.fire({
                text: "Please select a seat before proceeding to the next step.",
                icon: "warning",
                confirmButtonColor: "#3498db",
                confirmButtonText: "Okay",
            }).then(() => {
                navigate("/starcinema/home");
            });
            return;
        };
        if (showtime) {
            try {
                const dataInvoice = {
                    user_id: user.id,
                    email: email,
                    TotalAmount: totalAmount,
                    theater_id: showtime?.screen?.theater_id,
                };
                const invoiceToUse = await postData("/api/v1/createInvoice", dataInvoice);
                if (invoiceToUse) {
                    const selectedProducts = Object.values(selectedService).flat();
                    const makePayment = await postData("/api/v1/create-link-payment", {
                        invoice_id: invoiceToUse.id,
                        selectedSeatsID: selectedSeats.map(seat => seat.id),
                        selectedProducts: selectedProducts,
                        showtime_id: showtime.id,
                        totalAmount: totalAmount,
                        url_return: `http://localhost:5173/starcinema/payment-success/${showtime.id}`,
                        url_cancel: `http://localhost:5173/starcinema/payment-cancel/${showtime.id}`
                    });

                    if (makePayment?.checkoutUrl) {
                        window.location.href = makePayment.checkoutUrl;
                    } else {
                        alert("Failed to create payment link");
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <BannerTop title={"Invoice"} tags={["Tickets", "Foods", "Drinks"]} />
            <section className="page-title bg-one">
                <div className="container-xxl">
                    <div className="page-title-area">
                        <div className="item md-order-1">
                            <button className="custom-button back-button" onClick={() => navigate(`/starcinema/service-options/${showtime?.id}`)}>
                                <i className="flaticon-double-right-arrows-angles" style={{ fontSize: "20px" }}></i> Back
                            </button>
                        </div>
                        <div className="item">
                            <h5 className="title">Seat holding times:</h5>
                            <CountDownHandle />
                            <h5>Mins Left</h5>
                        </div>
                    </div>
                </div>
            </section>
            <div className="movie-facility padding-bottom padding-top">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="checkout-widget checkout-contact">
                                <h5 className="title">Share your Contact Details</h5>
                                <form className="checkout-contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">User Name:</label>
                                        <input
                                            type="text"
                                            value={username}
                                            placeholder="Full Name"
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            value={email}
                                            placeholder="Enter your Mail"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setIsFormSubmitted(false);
                                            }}
                                        />
                                        {emailError && <p style={{ color: "red", fontStyle: "italic", marginTop: "5px" }}>{emailError}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number:</label>
                                        <input
                                            type="text"
                                            value={numberphone}
                                            placeholder="Enter your Phone Number"
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value={isFormSubmitted ? "Confirmed" : "Continue"} className="custom-button" />
                                    </div>
                                </form>
                            </div>

                            <div className="checkout-widget checkout-card mb-0">
                                <h5 className="title">Payment Option</h5>
                                <ul className="payment-option">
                                    <li className={selectedPayment === "ScanQR" ? "active" : ""} onClick={() => handleSelectPayment("ScanQR")}>
                                        <a href="#0">
                                            <img src="/assets/images/payment/qrcode.png" alt="payment" />
                                            <span style={{ fontWeight: "bold" }}>ScanQR</span>
                                        </a>
                                    </li>
                                    <li className={selectedPayment === "Paypal" ? "active" : ""} onClick={() => handleSelectPayment("Paypal")}>
                                        <a href="#0">
                                            <img src="/assets/images/payment/cashier.png" alt="payment" />
                                            <span style={{ fontWeight: "bold" }}>Direct</span>
                                        </a>
                                    </li>
                                </ul>
                                {selectedPayment && (
                                    <div className="payment-description">
                                        {selectedPayment === "ScanQR" && (
                                            <div className="payment-bubble">
                                                <h2>PAYOS</h2>
                                                <h5>Use your mobile banking app to scan the QR code and complete your payment instantly.</h5>
                                            </div>
                                        )}
                                        {selectedPayment === "Debit Card" && (
                                            <div className="payment-bubble">
                                                <h5>Log in to your PayPal account to make a payment quickly and securely.</h5>
                                            </div>
                                        )}
                                        {selectedPayment === "Paypal" && (
                                            <div className="payment-bubble">
                                                <h5>Log in to your PayPal account to make a payment quickly and securely.</h5>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="custom-button" onClick={onClickBookedSeat}>MAKE PAYMENT</div>
                                <p className="notice">
                                    By Clicking "Make Payment" you agree to the <a href="#0">terms and conditions</a>
                                </p>
                            </div>
                        </div>
                        <CartBill selectedSeats={selectedSeats} showtime={showtime} selectedService={selectedService} setSelectedService={setSelectedService} totalAmount={totalAmount} setAmount={setAmount} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinalInvoice;
