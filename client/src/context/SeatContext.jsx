import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchData, postData } from "../api/api";
import io from "socket.io-client";
const socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
});
const SeatContext = createContext();

export const CurrentSeatProvider = ({ children }) => {
    const [showtime, setShowtime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [endTime, setEndTime] = useState(Date.now() + 15 * 60 * 1000);
    const [userId, setUserID] = useState('');
    const [occupiedSeats, setOccupiedSeats] = useState(new Set());

    useEffect(() => {
        console.log("showtime2:", showtime);
        if (!showtime) {
            console.log("chua co showtime");
            return;
        };
        socket.emit("get_held_seats", { showtimeId: showtime.id, userId });

        socket.on("seat_status_update", async ({ selectedSeatsOfUser, endTime, selectedSeatsOthers }) => {
            console.log("Ghế của user:", selectedSeatsOfUser);
            console.log("Ghế đã được giữ bởi người khác:", selectedSeatsOthers);

            if (selectedSeatsOfUser.length !== 0) {
                try {
                    const seats = await postData("/api/v1/seat", selectedSeatsOfUser);
                    console.log(seats);
                    const formattedSeats = seats.map(seat => ({
                        id: seat.id,
                        seat_name: seat.seat_name,
                        seat_price: seat.seat_type.price,
                        seat_type: seat.seat_type.type_name
                    }));

                    setSelectedSeats(formattedSeats);
                    setEndTime(endTime);
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin ghế:", error);
                }
            };
            setOccupiedSeats(new Set(selectedSeatsOthers));
        });

        return () => {
            socket.off("seat_status_update");
        };
    }, [showtime, userId]);

    useEffect(() => {
        // if (selectedSeats.length === 0 || selectedSeats.some(seat => seat === null)) {

        //     console.log("dữ liệu rỗng");
        //     if (JSON.stringify(selectedSeats) !== JSON.stringify(initialSeats)) {
        //         console.log("Khách hàng đã hủy hết ghế.");
        //         socket.emit("hold_seat", { showtimeId: showtime.id, selectedSeats: [], userId, endTime });
        //     };
        //     return;
        // };
        console.log("showtime:", showtime);
        console.log("user:", userId);
        console.log('seats:', selectedSeats);
        console.log("end time:", endTime);
        const seats = selectedSeats.map((seat) => seat?.id);
        socket.emit("hold_seat", { showtimeId: showtime.id, selectedSeats: seats, userId, endTime });
    }, [selectedSeats]);

    useEffect(() => {
        if (!showtime || !userId) return;
        socket.on("seat_status_update", ({ showtimeId, seatIds }) => {
            if (showtimeId === showtime.id) {
                console.log("Cập nhật danh sách ghế đã giữ:", seatIds);
                setOccupiedSeats(new Set(seatIds));
            }
        });
        return () => socket.off("seat_status_update");
    }, [showtime, userId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() >= endTime) {
                console.log("Timeout reached, releasing seats...");
                // socket.emit("release_seat", { showtimeId: showtime, seatIds: selectedSeats, userId: "user123" });

                setSelectedSeats([]);
                setInvoice(null);
                setEndTime(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime, selectedSeats, showtime]);

    return (
        <SeatContext.Provider value={{
            selectedSeats, setSelectedSeats, showtime, setShowtime, invoice, setInvoice, endTime, setEndTime, userId, setUserID, occupiedSeats
        }}>
            {children}
        </SeatContext.Provider>
    );
};


export const useCurrentSeat = () => {
    return useContext(SeatContext);
};
