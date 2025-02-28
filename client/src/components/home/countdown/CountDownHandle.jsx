import React from "react";
import Countdown from "react-countdown";

const CountDownHandle = ({ bookingId }) => {
    const countdownTime = 15 * 60 * 1000;
    const handleTimeout = async () => {
        if (!bookingId) return;
        try {
            const response = await fetch(`/api/cancel-booking/${bookingId}`, { method: "POST" });
            if (response.ok) {
                alert("Hóa đơn đã bị hủy do hết thời gian!");
            } else {
                console.error("Lỗi khi hủy hóa đơn");
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
        }
    };
    const renderer = ({ minutes, seconds }) => {
        return (
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
        );
    };
    return (
        <div className="countdown-box">
            <h5 className="title">
                <Countdown date={Date.now() + countdownTime} onComplete={handleTimeout} renderer={renderer} />
            </h5>
        </div>
    );
};

export default CountDownHandle;