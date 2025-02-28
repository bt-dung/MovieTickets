import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../../../api/api";
import SeatSelectionModal from "./SeatSelectionModal ";
const ScheduleItem = ({ schedules, movieTitle }) => {
    const [showWarning, setShowWarning] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [theaterDetail, setTheater] = useState(null);

    useEffect(() => {
        const fetchTheater = async (theater_id) => {
            try {
                const resTheater = await fetchData(`/api/v1/theaters/${theater_id}`);
                setTheater(resTheater);
            } catch (error) {
                console.error("Error fetching theaters:", error);
            }
        }
        fetchTheater(schedules.theater_id);
    }, [])
    const handleShowtimeClick = (showtime) => {
        setSelectedShowtime(showtime);
        setShowWarning(true);
    };
    return (<>
        <li>
            <div class="movie-name">
                <div class="icons">
                    <i class="far fa-heart"></i>
                    <i class="fas fa-heart"></i>
                </div>
                <a href="#0" class="name">{theaterDetail?.name || "Unknown Theater"}</a>
                <div class="location-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
            </div>
            <div className="movie-schedule">
                {schedules?.showtimes.map((showtime) => {
                    const formattedTime = new Date(showtime.start_time).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    });
                    return (
                        <div
                            key={showtime.id}
                            className="item"
                            style={{ fontSize: "16px", height: "100%", cursor: "pointer" }}
                            onClick={() => handleShowtimeClick(showtime)}
                        >
                            {formattedTime}
                        </div>
                    );
                })}
            </div>
        </li>
        <SeatSelectionModal
            showWarning={showWarning}
            setShowWarning={setShowWarning}
            showtime={selectedShowtime}
        />
    </>);
};
export default ScheduleItem;