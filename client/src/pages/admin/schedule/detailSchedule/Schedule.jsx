import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@mdi/react";
import {
    mdiSquareEditOutline,
    mdiDeleteOutline,
    mdiPlusCircleOutline,
    mdiCalendarRange,
} from "@mdi/js";
import Swal from "sweetalert2";
import { deleteData, fetchData } from "../../../../api/api";

const Schedule = () => {
    const [showtimes, setShowtime] = useState([]);
    const { theaterId } = useParams();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchShowtime = async (page = 0) => {
            try {
                const showtimes = await fetchData(`/api/v1/showtimes/${theaterId}/${selectedDate}?pageNumber=${page}&limit=8`);
                console.log(showtimes);
                setShowtime(showtimes.data);
                setTotalPages(showtimes.totalPages);
            } catch (error) {
                console.log("Error fetching showtimes:", error);
            }
        };
        fetchShowtime(currentPage);
    }, [currentPage, theaterId, selectedDate]);
    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDeleteShowtime = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this showtime?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (isConfirmed) {
            try {
                await deleteData(`/admin/showtime/${id}/delete`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Showtime deleted successfully.",
                    icon: "success",
                });
                window.location.reload();
            } catch (error) {
                console.error("Error deleting Showtime:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete showtime.",
                    icon: "error",
                });
            }
        }
    };

    const formatTime = (time) => {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <>
            <h1 className="text-muted mb-3">Schedule</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col d-flex justify-content-between align-items-center">
                                    <a href={`/admin/add-schedule/${theaterId}`} className="btn btn-danger mr-2">
                                        <Icon path={mdiPlusCircleOutline} size={1} /> Add Schedule
                                    </a>
                                    <div className="form-group mb-0">
                                        <div className="input-group rounded">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => { setSelectedDate(date) }}
                                                className="form-control"
                                                dateFormat="yyyy/MM/dd"
                                            />
                                            <span
                                                className="input-group-text bg-primary border-primary text-white"
                                            >
                                                <i className="font-13">
                                                    <Icon path={mdiCalendarRange} size={1} />
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="table-responsive">
                                <table
                                    className="table table-centered table-striped dt-responsive nowrap w-100"
                                    id="products-datatable"
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20px" }}></th>
                                            <th>ID</th>
                                            <th>Movie</th>
                                            <th>Screen</th>
                                            <th>Start time</th>
                                            <th>End time</th>
                                            <th className="row" style={{ width: "50px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showtimes.length > 0 ? (
                                            showtimes.map((showtime, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id={`customCheck${index}`}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`customCheck${index}`}
                                                            >
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="text-body font-weight-semibold"
                                                        >
                                                            {showtime.id}
                                                        </a>
                                                    </td>
                                                    <td>{showtime.movie?.title}</td>
                                                    <td>{showtime.screen?.name}</td>
                                                    <td>{formatTime(showtime.start_time)}</td>
                                                    <td>{formatTime(showtime.end_time)}</td>
                                                    <td>
                                                        <a href={`/admin/edit-showtime?showtimeId=${showtime.id}`} className="action-icon">
                                                            <Icon path={mdiSquareEditOutline} size={1} />
                                                        </a>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="action-icon"
                                                            onClick={() => handleDeleteShowtime(showtime.id)}
                                                        >
                                                            <Icon path={mdiDeleteOutline} size={1} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No showtime today.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <nav className="d-flex justify-content-center">
                                <ul className="pagination">
                                    <li
                                        className={`page-item ${currentPage === 0 ? "disabled" : ""
                                            }`}
                                    >
                                        <a
                                            className="page-link"
                                            href="javascript:void(0);"
                                            aria-label="Previous"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${currentPage === index ? "active" : ""
                                                }`}
                                        >
                                            <a
                                                className="page-link"
                                                href="javascript:void(0);"
                                                onClick={() => handlePageChange(index)}
                                            >
                                                {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                    <li
                                        className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""
                                            }`}
                                    >
                                        <a
                                            className="page-link"
                                            href="javascript:void(0);"
                                            aria-label="Next"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
