import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchData, postData } from "../api/api";
import io from "socket.io-client";
const socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
});
const SeatContext = createContext();

export const CurrentSeatProvider = ({ children }) => {
    const [currentShowtimeId, setShowtimeId] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [endTime, setEndTime] = useState(Date.now() + 15 * 60 * 1000);
    const [userId, setUserID] = useState('');
    const [occupiedSeats, setOccupiedSeats] = useState(new Set());
    const [selectedService, setSelectedService] = useState([]);

    const fetchHeldSeats = async (showtimeId, userId) => {
        console.log("showtime2:", showtimeId);
        if (!showtimeId) {
            console.log("Chưa có showtime");
            return;
        }

        socket.emit("get_held_seats", { showtimeId: showtimeId, userId });

        socket.on("seat_status_current", async ({ selectedSeatsOfUser = [], endTime, selectedSeatsOthers = [] }) => {
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
            socket.off("seat_status_current");
        };
    };


    useEffect(() => {
        console.log("showtime:", currentShowtimeId);
        console.log("user:", userId);
        console.log('seats:', selectedSeats);
        console.log("end time:", endTime);
        const seats = selectedSeats.map((seat) => seat?.id);
        socket.emit("hold_seat", { showtimeId: currentShowtimeId, selectedSeats: seats, userId, endTime });
    }, [selectedSeats]);

    useEffect(() => {
        if (!currentShowtimeId || !userId) return;
        socket.on("seat_status_update", ({ showtimeId, seatIds }) => {
            if (showtimeId === currentShowtimeId) {
                console.log("Cập nhật danh sách ghế đã giữ:", seatIds);
                setOccupiedSeats(new Set(seatIds));
            }
        });
        return () => socket.off("seat_status_update");
    }, [currentShowtimeId, userId]);

    return (
        <SeatContext.Provider value={{
            selectedSeats, setSelectedSeats, currentShowtimeId, setShowtimeId, endTime, setEndTime, userId, setUserID, occupiedSeats, selectedService, setSelectedService, fetchHeldSeats
        }}>
            {children}
        </SeatContext.Provider>
    );
};


export const useCurrentSeat = () => {
    return useContext(SeatContext);
};
