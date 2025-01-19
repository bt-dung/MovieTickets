import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, updateData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const EditSchedule = () => {
    const navigate = useNavigate();
    const { scheduleId } = useParams();
    const [theaterId, setTheaterId] = useState(null);
    const [movies, setMovies] = useState([]);
    const [screens, setScreens] = useState([]);
    const [movie_id, setMovieId] = useState('');
    const [screen_id, setScreenId] = useState('');
    const [date, setDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const scheduleResponse = await fetchData(`/api/v1/showtime/${scheduleId}`);
                console.log(scheduleResponse);
                setMovieId(scheduleResponse.movie_id);
                setScreenId(scheduleResponse.screen_id);
                setDate(scheduleResponse.date_time);
                setStartTime(formatDateTime(scheduleResponse.start_time));
                setEndTime(formatDateTime(scheduleResponse.end_time));
                setTheaterId(scheduleResponse.screen.theater_id);

                const movieResponse = await fetchData(`/api/v1/movies-theater/${theaterId}`);
                const screenResponse = await fetchData(`/api/v1/screens/${theaterId}`);
                setMovies(movieResponse.data);
                setScreens(screenResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load data. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        };
        getData();
    }, [theaterId, scheduleId]);

    const validateInput = () => {
        if (!movie_id || !screen_id || !start_time || !end_time) {
            Swal.fire({
                title: 'Validation Error',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }
        if (new Date(start_time) > new Date(end_time)) {
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

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        try {
            const response = await updateData(`/api/v1/showtime/${scheduleId}/update`, {
                movie_id,
                screen_id,
                date_time: date,
                start_time: start_time,
                end_time: end_time,
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
                    text: response.message || 'Failed to update schedule. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        } catch (error) {
            console.error('Error updating schedule:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to update schedule. Please try again.',
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
                <h1 className="text-muted mb-3">Edit Schedule</h1>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleEdit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="text"
                                        id="date"
                                        className="form-control"
                                        value={date}
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
                                        value={start_time}
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
                                        value={end_time}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-info float-right">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditSchedule;