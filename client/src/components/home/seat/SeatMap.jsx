import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { fetchData } from "../../../api/api";
import SeatRow from "./SeatRow";
const SeatMap = ({ screen, showtimeId, selectedSeats, setSelectedSeats }) => {
    const [seats, setSeatofScreen] = useState([]);
    console.log("seat choose:", selectedSeats);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        const fetchSeat = async (screenId) => {
            const data = await fetchData(`/api/v1/seats/${screenId}?showtimeId=${showtimeId}`);
            console.log(data);
            setSeatofScreen(data);
        }
        fetchSeat(screen?.id);
    }, [screen]);

    const toggleSeatSelection = (seatId, seatName, seatPrice, seatType) => {
        setSelectedSeats((prevSelectedSeats) => {
            const isSeatSelected = prevSelectedSeats.some(seat => seat.id === seatId);

            if (isSeatSelected) {
                return prevSelectedSeats.filter(seat => seat.id !== seatId);
            } else {
                if (prevSelectedSeats.length < 8) {
                    return [...prevSelectedSeats, { id: seatId, seat_name: seatName, seat_price: seatPrice, seat_type: seatType }];
                } else {
                    Swal.fire({
                        title: 'Warning!',
                        text: "You can select up to 8 seats only!",
                        icon: 'info',
                        confirmButtonText: 'Okay',
                    });
                    return prevSelectedSeats;
                }
            }
        });
    };

    const seatRows = Array.from({ length: screen?.total_row }).map((_, i) => {
        const rowLabel = alphabet[i];
        const rowSeats = seats.slice(i * screen?.total_column, (i + 1) * screen?.total_column);
        return <SeatRow key={i} seats={rowSeats} rowLabel={rowLabel} selectedSeats={selectedSeats} toggleSeatSelection={toggleSeatSelection} />;
    });
    return (
        <ul className="seat-area">
            {seatRows}
        </ul>
    );
};

export default SeatMap;