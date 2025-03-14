import React, { useEffect, useState } from "react";

const SeatRow = ({ seats, rowLabel, selectedSeats, toggleSeatSelection, occupiedSeats }) => {
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
    useEffect(() => {
        console.log("Occupied Seat:", occupiedSeats);
    }, [occupiedSeats])
    return (
        <li className="seat-line">
            <span>{rowLabel}</span>
            <ul className="seat--area">
                {groupedSeats.map((group) => (
                    <li className="front-seat">
                        <ul>
                            {group.map((seat) => {
                                const isSelected = selectedSeats.some(selectedSeat => selectedSeat?.id === seat.id && selectedSeat?.seat_name === seat.seat_name);
                                const isBooked = seat.tickets.length > 0 || seat.tickets?.invoices?.PaymentStatus === "Paid";
                                const isHolding = occupiedSeats.has(seat.id) && !selectedSeats.some(selectedSeat => selectedSeat?.id === seat.id);
                                let seatImage = "/assets/images/movie/seat01.png";
                                if (isHolding) {
                                    seatImage = "/assets/images/movie/seat_holding.png";
                                } else if (!isBooked && isSelected) {
                                    seatImage = "/assets/images/movie/seat01-free.png";
                                }
                                return (
                                    <li
                                        className={`single-seat ${isBooked || isHolding ? 'seat-booked' : 'sit-free'}`}
                                        key={seat.id}
                                        onClick={() => !isBooked && toggleSeatSelection(seat.id, seat.seat_name, seat.seat_type.price, seat.seat_type.type_name)}
                                        aria-disabled={isBooked}
                                    >
                                        <img
                                            src={seatImage}
                                            alt={seat.seat_name}
                                            style={{ width: "42px" }}
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