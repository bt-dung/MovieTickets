import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useCurrentSeat } from "../../../context/SeatContext";
import { updateData, deleteData } from "../../../api/api";
import Swal from 'sweetalert2';

const CountDownHandle = () => {
    const { endTime, setEndTime, setSelectedSeats, setSelectedService } = useCurrentSeat();
    const [isTimeout, setIsTimeout] = useState(false);
    useEffect(() => {
        if (Date.now() >= endTime) {
            handleTimeout();
        }
    }, [endTime]);

    const handleTimeout = async () => {
        if (isTimeout) return;
        setIsTimeout(true);
        setSelectedSeats([]);
        setSelectedService([]);
        setEndTime(null);
        setIsTimeout(false);

        const isConfirm = await Swal.fire({
            text: 'Your current transaction has been canceled due to timeout. Please select your seats again and book your tickets!!',
            icon: 'info',
            confirmButtonColor: '#3498db',
            confirmButtonText: 'Okay',
        });

        if (isConfirm.isConfirmed) {
            window.location.reload();
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
                <Countdown date={parseInt(endTime, 10)} onComplete={handleTimeout} renderer={renderer} />
            </h5>
        </div>
    );
};

export default CountDownHandle;