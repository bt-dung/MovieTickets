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
                socket.emit("seat_status_current", {
                    selectedSeatsOfUser: userSeats,
                    endTime: endTime,
                    selectedSeatsOthers: otherSeats
                });
            } else {
                socket.emit("seat_status_current", {
                    selectedSeatsOfUser: [],
                    selectedSeatsOthers: []
                });
            }
        });

        socket.on("hold_seat", ({ showtimeId, selectedSeats, userId, endTime }) => {
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
                if (!endTime && selectedSeats.length === 0) {
                    console.log(`User ${userId} đã thanh toán, xóa ghế khỏi danh sách.`);
                    showtimeSeats[showtimeId] = showtimeSeats[showtimeId].filter(userSeat => userSeat.userId !== userId);
                    console.log("ghế sau khi xóa: ", showtimeSeats[showtimeId]);
                    io.emit("seat_status_update", {
                        showtimeId,
                        seatIds: showtimeSeats[showtimeId].flatMap(({ selectedSeats }) => selectedSeats)
                    });
                    return;
                }
                showtimeSeats[showtimeId][existingSeatIndex].selectedSeats = selectedSeats;
                console.log("selectedSeats:", showtimeSeats[showtimeId]);
            } else {
                showtimeSeats[showtimeId].push({
                    userId: userId,
                    selectedSeats: selectedSeats,
                    endTime: endTime
                });
                console.log("selectedSeats:", showtimeSeats[showtimeId].find(seat => seat.userId === userId));
            }

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

        socket.on("delete_user", ({ showtimeId, userId }) => {
            console.log("delete_user:", showtimeId, userId);
            if (showtimeSeats[showtimeId]) {
                showtimeSeats[showtimeId] = showtimeSeats[showtimeId].filter(userSeat => userSeat.userId !== userId);

                io.emit("seat_status_update", {
                    showtimeId,
                    seatIds: showtimeSeats[showtimeId].flatMap(({ selectedSeats }) => selectedSeats)
                });
            }
        });
    });
};
