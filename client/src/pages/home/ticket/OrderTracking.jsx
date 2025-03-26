import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCurrentSeat } from "../../../context/SeatContext";
import { useUser } from "../../../context/UserContext";
import { fetchData } from "../../../api/api";
import { FormatDate, formatHour } from "../../../utils/formatDateHelper";
import imageURL from "/assets/images/banner/banner04.jpg";
import CountDownHandle from "../../../components/home/countdown/CountDownHandle";
const OrderTracking = () => {
    const navigate = useNavigate();
    const { selectedSeats, setSelectedSeats, currentShowtimeId, setEndTime, userId, setUserID, fetchHeldSeats } = useCurrentSeat();
    const { user } = useUser();
    const [invoices, setInvoice] = useState('');
    const [noticeHoldingSeat, setNotice] = useState(false);
    const [showtime, setShowtime] = useState(null);
    useEffect(() => {
        if (selectedSeats.length === 0) {
            if (user.id != userId) {
                setUserID(user.id);
            }
            fetchHeldSeats({ userId: user.id });
        }
        const fetchInvoice = async (userId) => {
            try {
                const res = await fetchData(`/api/v1/user/${userId}/invoices`);
                console.log(res);
                setInvoice(res);
            } catch (error) {
                console.error("Error fetching invoices data of user:", error);
            }
        }
        fetchInvoice(user.id);
    }, [user]);
    useEffect(() => {
        if (currentShowtimeId) {
            const fetchShowtime = async (currentShowtimeId) => {
                try {
                    const res = await fetchData(`/api/v1/showtime/${currentShowtimeId}`);
                    console.log("showtime:", res.data);
                    setShowtime(res.data);
                } catch (error) {
                    console.error("Error fetching showtime data:", error);
                }
            }
            fetchShowtime(currentShowtimeId);
        }
        setNotice(true);
        console.log(selectedSeats);
    }, [user, selectedSeats, currentShowtimeId]);
    const handleContinueHoldSeat = () => {
        navigate(`/starcinema/theater/${showtime?.screen?.theater_id}/choose-seat/${showtime.id}`);
        return;
    }
    const handleCancelHoldSeat = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to cancel this holding?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        });
        if (isConfirmed) {
            setSelectedSeats([]);
            setEndTime(null);
            setNotice(false);
        };

    }
    const checkDetail = (invoiceId) => {
        navigate(`/starcinema/orders/detail-order/${invoiceId}`);
        return;
    };
    return (<>
        <section className="banner-section">
            <div
                className="banner-bg bg_img bg-fixed"
                style={{ backgroundImage: `url(${imageURL})` }}
            ></div>

            <div className="title-page-ticket">
                TICKETS
            </div>

            {selectedSeats.length !== 0 && noticeHoldingSeat && (
                <div className="reserved-seat">
                    <button className="close-button" onClick={() => setNotice(false)}>
                        &times;
                    </button>
                    <div className="info-container">
                        <p className="info-label">You are holding seats:</p>
                        <p className="info-content">{selectedSeats?.map(seat => seat.seat_name).join(", ")}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Movie:</p>
                        <p className="info-content">{showtime?.movie?.title}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Showtime:</p>
                        <p className="info-content">{formatHour(showtime?.start_time)} ~ {formatHour(showtime?.end_time)}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Date:</p>
                        <p className="info-content">{FormatDate(showtime?.date_time)}</p>
                    </div>
                    <div className="timeleft">
                        <p className="info-label">Time left:</p>
                        <CountDownHandle />
                    </div>
                    <div className="button-group">
                        <button className="pay-button" onClick={handleContinueHoldSeat}>Continue Booking</button>
                        <button className="cancel-button" onClick={handleCancelHoldSeat}>Cancel</button>
                    </div>
                </div>
            )}
            <div className="container-xl order-list-gruop">
                <h3 className="list-title">booking history</h3>
                <div className="order-grid">
                    {Object.entries(invoices).length === 0 ? (
                        <p style={{ color: "#888", fontSize: "20px", textAlign: "center", marginTop: "20px" }}>You do not have any orders</p>
                    ) : (
                        Object.entries(invoices).map(([date, orders]) => {
                            const currentDate = new Date().toISOString().split('T')[0];
                            return (
                                <div className="order-item" key={date}>
                                    <div className="order-date">
                                        {date === currentDate ? "Today" : date}
                                    </div>
                                    {orders.map((order) => (
                                        <div key={order.id} className="order-card" onClick={() => checkDetail(order.id)}>
                                            <p className="order-id">Order Code: {order.id}</p>
                                            <p className="order-id">Time: {formatHour(order.purchase_date)}</p>
                                            <p className="order-total">Total Price: {Math.floor(order.TotalAmount).toLocaleString()} VND</p>
                                            <p className={`order-status ${order.PaymentStatus.toLowerCase()}`}>Status: {order.PaymentStatus}</p>
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    </>);
};

export default OrderTracking;