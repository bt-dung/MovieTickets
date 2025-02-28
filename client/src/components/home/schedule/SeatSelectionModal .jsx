import React from "react";

const SeatSelectionModal = ({ showWarning, setShowWarning, showtime, theater_id }) => {
    if (!showWarning) return null;
    const formattedTime = new Date(showtime.start_time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return (
        <section className={`window-warning ${showWarning ? "" : "inActive"}`}>
            <div className="lay" onClick={() => setShowWarning(false)}></div>
            <div className="warning-item">
                <h6 className="subtitle">Welcome!</h6>
                <h5 className="subcontent">Film: "{showtime?.movie?.title || "Unknown Movie"}"</h5>
                <h5 className="subcontent">Date: {showtime?.date_time}, Showtime: {formattedTime || "N/A"}</h5>
                <h4 className="title">Select Your Seats</h4>
                <div className="thumb">
                    <img src="/assets/images/movie/seat-plan.png" alt="movie" />
                </div>
                <a href={`/starcinema/theater/${theater_id}/choose-seat/${showtime.id}`} className="custom-button seatPlanButton">
                    Seat Plans<i className="fas fa-angle-right"></i>
                </a>
            </div>
        </section>
    );
};

export default SeatSelectionModal;