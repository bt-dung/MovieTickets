import React, { createContext, useState, useContext, useEffect } from "react";

const SeatContext = createContext();
export const CurrentSeatProvider = (props) => {
    const [showtime, setShowtime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [endTime, setEndTime] = useState(Date.now() + 15 * 60 * 1000);
    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() >= endTime) {
                setShowtime('');
                setSelectedSeats([]);
                setInvoice(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime, setShowtime, setSelectedSeats, setInvoice]);
    return (
        <SeatContext.Provider value={{ selectedSeats, setSelectedSeats, showtime, setShowtime, invoice, setInvoice, endTime, setEndTime }}>
            {props.children}
        </SeatContext.Provider>
    );
};

export const useCurrentSeat = () => {
    return useContext(SeatContext);
};
