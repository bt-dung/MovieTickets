import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { postData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const AddScreen = () => {
    const navigate = useNavigate();
    const { theaterId } = useParams();

    const [name, setName] = useState('');
    const [total_row, setRows] = useState('');
    const [total_column, setColumns] = useState('');

    const validateInput = () => {
        if (!name || !total_row || !total_column) {
            Swal.fire({
                title: 'Validation Error',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        if (isNaN(total_row) || total_row <= 0) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Rows must be a positive number.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        if (isNaN(total_column) || total_column <= 0) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Columns must be a positive number.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        if (total_row > 10) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Rows must not exceed 10.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        if (total_column > 14) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Columns must not exceed 14.',
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
            const response = await postData('/api/v1/create-screen', {
                name,
                theater_id: theaterId,
                total_row: total_row,
                total_column: total_column,
            });

            console.log("screen-added:", response);
            if (response.status === "SUCCESS") {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setName('');
                setRows('');
                setColumns('');
            }
        } catch (error) {
            console.error('Error adding screen:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add screen. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <>
            <div className="d-flex w-100 ">
                <div
                    type="button"
                    className="btn mr-3"
                    onClick={() => navigate(-1)}
                >
                    <Icon path={mdiArrowLeft} size={2} />
                </div>
                <h1 className="text-muted mb-3">Add Screen</h1>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleAdd}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Screen Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="rows">Number of Rows</label>
                                    <input
                                        type="number"
                                        id="rows"
                                        className="form-control"
                                        value={total_row}
                                        onChange={(e) => setRows(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="columns">Number of Columns</label>
                                    <input
                                        type="number"
                                        id="columns"
                                        className="form-control"
                                        value={total_column}
                                        onChange={(e) => setColumns(e.target.value)}
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

export default AddScreen;
