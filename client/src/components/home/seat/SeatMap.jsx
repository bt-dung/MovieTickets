import React from "react";
import SeatRow from "./SeatRow";
import { generateSeatData } from "../../../utils/generateSeatData";
const SeatMap = ({ rows, cols }) => {
    const seatData = generateSeatData(rows, cols);
    return (
        <ul className="seat-area">
            {seatData.map((seats, index) => (
                <SeatRow key={index} rowLabel={String.fromCharCode(65 + index)} seats={seats} />
            ))}
        </ul>
    );
};

export default SeatMap;