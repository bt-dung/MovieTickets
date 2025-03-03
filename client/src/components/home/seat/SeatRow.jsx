import React, { useEffect, useState } from "react";

const SeatRow = ({ seats, rowLabel, selectedSeats, toggleSeatSelection }) => {
    let groupedSeats = [];
    if (seats.length <= 10) {
        groupedSeats = [
            seats.slice(0, 4),
            seats.slice(4, seats.length),
        ];
    }
    else {
        groupedSeats = [
            seats.slice(0, 4),
            seats.slice(4, 10),
            seats.slice(10, seats.length)
        ];
    };

    return (
        <li className="seat-line">
            <span>{rowLabel}</span>
            <ul className="seat--area">
                {groupedSeats.map((group) => (
                    <li className="front-seat">
                        <ul>
                            {group.map((seat) => {
                                const isSelected = selectedSeats.some(selectedSeat => selectedSeat.id === seat.id && selectedSeat.seat_name === seat.seat_name);
                                const isBooked = seat.tickets.length > 0;
                                return (
                                    <li
                                        className={`single-seat ${isBooked ? 'seat-booked' : 'sit-free'}`}
                                        key={seat.id}
                                        onClick={() => !isBooked && toggleSeatSelection(seat.id, seat.seat_name, seat.seat_type.price, seat.seat_type.type_name)}
                                    >
                                        <img
                                            src={
                                                seat.tickets.length > 0 || isSelected
                                                    ? "/assets/images/movie/seat01.png"
                                                    : "/assets/images/movie/seat01-free.png"
                                            }
                                            alt={seat.seat_name}
                                        />
                                        <span className="sit-num">{seat.seat_name}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
            <span>{rowLabel}</span>
        </li>
    );
};
export default SeatRow;