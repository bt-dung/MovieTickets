import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCurrentSeat } from "../../../context/SeatContext";
import { useUser } from "../../../context/UserContext";
import { postData } from "../../../api/api";
const PaymentCancel = () => {
    const { showtimeId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const { setSelectedSeats, setShowtimeId, userId, setUserID, setEndTime, setSelectedService } = useCurrentSeat();
    const { user } = useUser();
    const isCancelled = queryParams.get("cancel") === "true";
    const orderCode = queryParams.get("orderCode");

    console.log({ isCancelled, orderCode });

    useEffect(() => {
        if (user.id !== userId) {
            setUserID(user.id);
            setShowtimeId(showtimeId);
        }
        if (isCancelled) {
            const cancelInvoice = async (isCancelled, orderCode) => {
                const statusPayment = {
                    cancel: isCancelled,
                    orderCode: orderCode
                };
                const res = await postData("/api/v1/receive-hook", statusPayment);
                console.log(res);
            }
            cancelInvoice(isCancelled, orderCode);
        }


    }, [user, location.search]);

    const handleContinueBooking = () => {
        navigate(`/starcinema/final-invoice/${showtimeId}`);
    };

    const handleBackToHome = () => {
        setSelectedSeats([]);
        setEndTime(null);
        setSelectedService([]);
        navigate("/starcinema/home");
    };

    return (
        <div className="container-xxl">
            <div className="checkout-widget">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div>Payment has been cancelled!!</div>
                    {isCancelled && <p>Your order {orderCode} has been cancelled.</p>}
                    <button onClick={handleContinueBooking} className="btn btn-primary mt-3">
                        Continue booking seat
                    </button>
                    <button onClick={handleBackToHome} className="btn btn-secondary mt-2">
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
