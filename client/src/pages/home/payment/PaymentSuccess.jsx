import { useEffect, useState } from "react";
import { useCurrentSeat } from "../../../context/SeatContext";
import { useUser } from "../../../context/UserContext";
import { useLocation, useParams } from "react-router-dom";

const PaymentSuccess = () => {
    const { showtimeId } = useParams();
    const { setSelectedSeats, setShowtimeId, userId, setUserID, setEndTime, setSelectedService } = useCurrentSeat();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { user } = useUser();
    const isCancelled = queryParams.get("cancel") === "true";
    const isPaided = queryParams.get("status") === "PAID";

    useEffect(() => {
        if (user.id !== userId) {
            setUserID(user.id);
            setShowtimeId(showtimeId);
        }
        if (isPaided && !isCancelled) {
            setSelectedSeats([]);
            setEndTime(null);
            setSelectedService([]);
            console.log("Thanh toán thành công - Reset state");
        }
    }, [user, location.search]);

    return (
        <>
            <div className="container-xxl">
                <div className="checkout-widget">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="text-success">Payment successful!!</div>
                        <a href="/starcinema/home">Back to home</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccess;
