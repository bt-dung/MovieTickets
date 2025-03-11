
module.exports = function SeatSocket(io) {
    let showtimeSeats = {};
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("get_held_seats", ({ showtimeId, userId }) => {
            const statusCurrentSeats = showtimeSeats[showtimeId];
            console.log("status Seats:", statusCurrentSeats);
            if (statusCurrentSeats) {
                const userSeatStatus = statusCurrentSeats.find(seatInfo => seatInfo.userId === userId);
                const userSeats = userSeatStatus ? userSeatStatus.selectedSeats : [];
                const endTime = userSeatStatus ? userSeatStatus.endTime : '';
                const otherSeats = statusCurrentSeats
                    .filter(seatInfo => seatInfo.userId !== userId)
                    .flatMap(seatInfo => seatInfo.selectedSeats);
                console.log("seat holding:", userSeats);
                socket.emit("seat_status_update", {
                    selectedSeatsOfUser: userSeats,
                    endTime: endTime,
                    selectedSeatsOthers: otherSeats
                });
            } else {
                socket.emit("seat_status_update", {
                    selectedSeatsOfUser: [],
                    selectedSeatsOthers: []
                });
            }
        });


        socket.on("hold_seat", ({ showtimeId, selectedSeats, userId, endTime }) => {
            console.log("showtime:", showtimeId, userId, selectedSeats, endTime);
            Object.keys(showtimeSeats).forEach((id) => {
                if (id !== showtimeId) {
                    showtimeSeats[id] = showtimeSeats[id].filter(seat => seat.userId !== userId);
                }
            });
            if (!showtimeSeats[showtimeId]) {
                showtimeSeats[showtimeId] = [];
            }
            const existingSeatIndex = showtimeSeats[showtimeId].findIndex(seat => seat.userId === userId);

            if (existingSeatIndex !== -1) {
                showtimeSeats[showtimeId][existingSeatIndex].selectedSeats = selectedSeats;
            } else {
                showtimeSeats[showtimeId].push({
                    userId: userId,
                    selectedSeats: selectedSeats,
                    endTime: endTime
                });
            }
            console.log(showtimeSeats[showtimeId]);
            socket.broadcast.emit("seat_status_update", {
                showtimeId,
                seatIds: showtimeSeats[showtimeId].flatMap(({ selectedSeats }) => selectedSeats)
            });
            setTimeout(() => {
                showtimeSeats[showtimeId] = showtimeSeats[showtimeId].filter(userSeat => {
                    if (Date.now() >= userSeat.endTime) {
                        return false;
                    }
                    return true;
                });

                io.emit("seat_status_update", {
                    showtimeId,
                    seatIds: showtimeSeats[showtimeId].flatMap(({ selectedSeats }) => selectedSeats)
                });
            }, endTime - Date.now());
        });
        socket.on("update_seat", ({ showtimeId, selectedSeats, userId, endTime }) => {
            if (!showtimeSeats[showtimeId]) {
                showtimeSeats[showtimeId] = {};
            }

            selectedSeats.forEach((seatId) => {
                if (showtimeSeats[showtimeId][seatId]?.userId === userId) {
                    showtimeSeats[showtimeId][seatId] = { userId, endTime };
                }
            });

            io.emit("seat_status_update", {
                showtimeId,
                seats: Object.entries(showtimeSeats[showtimeId]).map(([seatId, data]) => ({
                    seatId,
                    userId: data.userId,
                    endTime: data.endTime,
                })),
            });
        });
    });
};
