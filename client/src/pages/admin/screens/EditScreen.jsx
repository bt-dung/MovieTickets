import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { postData, fetchData, updateData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const EditScreen = () => {
    const navigate = useNavigate();
    const { screenId } = useParams();

    const [name, setName] = useState('');
    const [total_row, setRows] = useState('');
    const [total_column, setColumns] = useState('');

    useEffect(() => {
        const fetchScreenData = async () => {
            try {
                const response = await fetchData(`/api/v1/screen/${screenId}`);
                console.log(response);
                setName(response.name);
                setRows(response.total_row);
                setColumns(response.total_column);
            } catch (error) {
                console.error('Error fetching screen data:', error);
            }
        };
        fetchScreenData();
    }, [screenId]);

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

        return true;
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to update this screen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel',
        });
        if (isConfirmed) {
            try {
                const response = await updateData(`/api/v1/screen/${screenId}/update`, {
                    name,
                    total_row,
                    total_column
                });

                if (response.status === 'SUCCESS') {
                    Swal.fire({
                        title: 'Success!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });
                    navigate(-1);
                }
            } catch (error) {
                console.error('Error updating screen:', error);
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
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
                <h1 className="text-muted mb-3">Edit Screen</h1>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleEdit}>
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
                                    Save Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditScreen;