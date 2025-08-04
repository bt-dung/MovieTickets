import React, { useEffect, useState } from "react";
import { fetchData, postData, updateData, deleteData } from "../../../api/api";
import "./DetailTheater.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Icon from "@mdi/react";
import {
    mdiArrowLeft,
    mdiPlusCircleOutline,
    mdiDeleteOutline,
} from "@mdi/js";

const DetailTheater = () => {
    const MySwal = withReactContent(Swal);
    const [movies, setMovies] = useState([]);
    const { theaterId } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [totalScreens, setTotalScreens] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);
    const [managerInfo, setManager] = useState('');
    const [managers, setManagers] = useState([]);
    const [selectManagerID, setManagerId] = useState('');

    useEffect(() => {
        const getTheater = async (page = 0) => {
            try {
                const url = `/api/v1/theaters/${theaterId}`;
                const res = await fetchData(url);
                setName(res.name);
                setAddress(res.address);
                setTotalScreens(res.total_screens);
                setTotalSeats(res.total_seats);
                setManager(res.manager.name);

                const managersResponse = await fetchData('/admin/managers');
                console.log(managersResponse);
                setManagers(managersResponse);

                const movieTheater = await fetchData(`/api/v1/movies-theater/${theaterId}?pageNumber=${page}&limit=8`);
                setTotalPages(movieTheater.totalPages);
                setMovies(movieTheater.data);
            } catch (error) {
                console.error("Error fetching theater data:", error);
            }
        };
        getTheater(currentPage);
    }, [theaterId, currentPage]);
    useEffect(() => {
        console.log("quan ly mơi: ", selectManagerID);
        const updateManager = async () => {
            try {
                const data = { manager_id: selectManagerID };
                const response = await updateData(`/api/v1/theaters/${theaterId}/update`, data);
                if (response.status === 'SUCCESS') {
                    const result = await Swal.fire({
                        title: 'Success!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });

                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                }
            } catch (error) {
                console.error('Error updating theater:', error);
            }
        }
        if (selectManagerID !== "") {
            updateManager();
        }
    }, [selectManagerID])
    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDeleteMovie = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete the movie in this theater?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (isConfirmed) {
            try {
                await deleteData(`/api/v1/movies-theater/delete?theater_id=${theaterId}&movie_id=${id}`);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Movie in Theater deleted successfully.',
                    icon: 'success',
                });
                window.location.reload();
            } catch (error) {
                console.error('Error deleting Movie in Theater:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete Movie in Theater.',
                    icon: 'error',
                });
            }
        }
    };

    const handleAddMovie = async () => {
        const { value: movieId } = await MySwal.fire({
            title: 'Enter Movie ID',
            html: `<input id="movie_id" class="swal2-input" placeholder="Enter Movie ID" />`,
            confirmButtonText: 'Add Movie',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                const movieId = document.getElementById('movie_id').value;
                if (!movieId) {
                    Swal.showValidationMessage('Please enter a movie ID!');
                }
                return movieId;
            }
        });

        if (movieId) {
            console.log('Movie ID to add:', movieId);
            try {
                const res = await postData('/api/v1/movies-theater/add-movie', { theaterId, movieId });
                if (res.status === "SUCCESS") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Movie Added Successfully!',
                        text: `Movie ID ${movieId} added to the theater.`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error adding film:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add film. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        }
    };

    return (
        <>  <div className="d-flex w-100 ">
            <div
                type="button"
                className="btn mr-3"
                onClick={() => navigate(-1)}
            >
                <Icon path={mdiArrowLeft} size={2} />
            </div>
            <h1 className="text-muted mb-3">Theater</h1>
        </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="clearfix">
                                <div className="float-left mb-3">
                                    <h1 className="text-purple-400 font-weight-bold">{name}</h1>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="text-primary">Address</p>
                                    <p className="text-primary">Total Screens</p>
                                    <p className="text-primary">Total Seats</p>
                                </div>

                                <div className="col-sm-2">
                                    <p>: {address}</p>
                                    <p>: {totalScreens}</p>
                                    <p>: {totalSeats}</p>
                                </div>
                                <div className="col-sm-2 ms-auto mr-5 d-flex justify-content-center h-auto">
                                    <div className="p-2 bg-light border rounded shadow-sm h-auto">
                                        <p className="mb-0 fw-bold text-dark mb-2">
                                            Manager: <span className="text-primary">{managerInfo}</span>
                                        </p>
                                        <div className="p-2 bg-light border rounded shadow-sm w-auto">
                                            <select
                                                id="manager_id"
                                                className="form-control"
                                                style={{ border: "none" }}
                                                value={selectManagerID}
                                                onChange={(e) => {
                                                    const newManagerId = e.target.value;
                                                    const selectedManager = managers.find((m) => m.id === parseInt(newManagerId));
                                                    const confirmChange = window.confirm(
                                                        `Bạn có chắc muốn đổi quản lý sang: ${selectedManager?.name} (ID: ${selectedManager?.id}) không?`
                                                    );
                                                    if (confirmChange) {
                                                        setManagerId(newManagerId);
                                                    }
                                                }}
                                                required
                                            >
                                                <option value="" disabled>{"Change Manager"}</option>
                                                {managers.map((manager) => (
                                                    <option key={manager.id} value={manager.id}>
                                                        {manager.id} - {manager.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="p-2 bg-light border rounded mt-5 ">
                                <h2 className="text-muted mb-3 d-flex justify-content-between ">
                                    Movies Showing
                                    <button className="btn btn-danger mb-2" style={{ width: 'auto', whiteSpace: 'nowrap' }} onClick={handleAddMovie}>
                                        <Icon path={mdiPlusCircleOutline} size={1} /> Add Movie
                                    </button>
                                </h2>
                                <div className="row">
                                    {movies.length > 0 ? (
                                        movies.map((movie, index) => (
                                            <div className="col-md-3" key={index}>
                                                <div className="card d-block" style={{ height: '300px' }}>
                                                    <div className="card-img-top">
                                                        <img class="object-fit-contain img-fluid " src={movie.img_bg} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <p className="card-title text-danger">ID: {movie.id}</p>
                                                                <h4 className="card-text text-primary">{movie.title}</h4>
                                                            </div>
                                                            <div class="d-flex gap-2">
                                                                <a href="javascript:void(0);" className="action-icon" onClick={() => handleDeleteMovie(movie.id)}>
                                                                    <Icon path={mdiDeleteOutline} size={1} />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                Curently, no movies showing in this theater.
                                            </td>
                                        </tr>
                                    )}
                                </div>
                                <nav className="d-flex justify-content-center">
                                    <ul className="pagination">
                                        <li
                                            className={`page-item ${currentPage === 0 ? 'disabled' : ''
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
                                                className={`page-item ${currentPage === index ? 'active' : ''
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
                                            className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''
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
            </div>
        </>
    );
};

export default DetailTheater;
