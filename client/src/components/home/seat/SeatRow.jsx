import React from "react";
const SeatRow = ({ rowLabel, seatGroups }) => {
    return (
        <li className="seat-line">
            <span>{rowLabel}</span>
            <ul className="seat--area">
                {seatGroups.map((seats, groupIdx) => (
                    <li key={groupIdx} className="front-seat">
                        <ul>
                            {seats.map((seat, seatIdx) => (
                                <li key={seatIdx} className={`single-seat ${seat.free ? "seat-free" : ""}`}>
                                    <img
                                        src={seat.free ? "assets/images/movie/seat01-free.png" : "assets/images/movie/seat01.png"}
                                        alt="seat"
                                    />
                                    {seat.number && <span className="sit-num">{seat.number}</span>}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <span>{rowLabel}</span>
        </li>
    );
};
export default SeatRow;