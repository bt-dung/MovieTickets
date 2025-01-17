import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, postData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const AddSchedule = () => {
    const navigate = useNavigate();
    const { theaterId } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const date = new Date(urlParams.get('dateTime'));
    console.log("date1:", date.toISOString());
    const formatDate = (date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };
    console.log("Date-time:", formatDate(date));
    const [movies, setMovies] = useState([]);
    const [screens, setScreens] = useState([]);
    const [movie_id, setMovieId] = useState('');
    const [screen_id, setScreenId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const movieResponse = await fetchData(`/api/v1/movies-theater/${theaterId}`);
                const screenResponse = await fetchData(`/api/v1/screens/${theaterId}`);
                setMovies(movieResponse.data);
                setScreens(screenResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load movies or screens.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        };
        getData();
    }, [theaterId]);

    const validateInput = () => {
        if (!movie_id || !screen_id || !startTime || !endTime) {
            Swal.fire({
                title: 'Validation Error',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }
        console.log(new Date(startTime));
        console.log(new Date(endTime));
        if (new Date(startTime) > new Date(endTime)) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Start time must be before end time.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        return true;
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        try {
            const response = await postData('/api/v1/insertShowtime', {
                movie_id: movie_id,
                screen_id: screen_id,
                date_time: formatDate(date),
                start_time: startTime,
                end_time: endTime,
            });
            if (response.status === 'SUCCESS') {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                }).then(() => {
                    navigate(-1);
                });
            } else if (response.data.status === 'FAILED') {
                Swal.fire({
                    title: 'Error!',
                    text: response.message || 'Failed to add schedule. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        } catch (error) {
            console.error('Error adding schedule:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };
    return (
        <>
            <div className="d-flex w-100">
                <div
                    type="button"
                    className="btn mr-3"
                    onClick={() => navigate(-1)}
                >
                    <Icon path={mdiArrowLeft} size={2} />
                </div>
                <h1 className="text-muted mb-3">Add Schedule</h1>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleAdd}>
                                <div className="form-group mb-3">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="text"
                                        id="date"
                                        className="form-control"
                                        value={formatDate(date)}
                                        disabled
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="movie">Select Movie</label>
                                    <select
                                        id="movie"
                                        className="form-control"
                                        value={movie_id}
                                        onChange={(e) => setMovieId(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Select Movie --</option>
                                        {movies.map((movie) => (
                                            <option key={movie.id} value={movie.id}>
                                                {movie.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="screen">Select Screen</label>
                                    <select
                                        id="screen"
                                        className="form-control"
                                        value={screen_id}
                                        onChange={(e) => setScreenId(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Select Screen --</option>
                                        {screens.map((screen) => (
                                            <option key={screen.id} value={screen.id}>
                                                {screen.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="start_time">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        id="start_time"
                                        className="form-control"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="end_time">End Time</label>
                                    <input
                                        type="datetime-local"
                                        id="end_time"
                                        className="form-control"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-info float-right">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddSchedule;
