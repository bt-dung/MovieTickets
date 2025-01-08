import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { postData, fetchData, updateData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const EditTheater = () => {
    const navigate = useNavigate();
    const { theaterId } = useParams();
    console.log(theaterId);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [area_id, setAreaId] = useState('');
    const [manager_id, setManagerId] = useState('');
    const [areas, setAreas] = useState([]);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        const fetchTheaterData = async () => {
            try {
                const theaterResponse = await fetchData(`/api/v1/theaters/${theaterId}`);
                setName(theaterResponse.name);
                setAddress(theaterResponse.address);
                setAreaId(theaterResponse.area_id);
                setManagerId(theaterResponse.manager_id);

                const areasResponse = await fetchData('/api/v1/areas');
                setAreas(areasResponse.data);

                const managersResponse = await fetchData('/admin/managers');
                setManagers(managersResponse);
            } catch (error) {
                console.error('Error fetching theater data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch theater data.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        };

        fetchTheaterData();
    }, [theaterId]);

    const validateInput = () => {
        if (!name || !address || !area_id || !manager_id) {
            Swal.fire({
                title: 'Validation Error',
                text: 'All fields are required.',
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
            text: 'Do you really want to update this theater?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel',
        });
        if (isConfirmed) {
            try {
                const response = await updateData(`/api/v1/theaters/${theaterId}/update`, {
                    name,
                    address,
                    area_id,
                    manager_id,
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
                console.error('Error updating theater:', error);
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
                <h1 className="text-muted mb-3">Edit Theater</h1>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleEdit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
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
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="area_id">Area</label>
                                    <select
                                        id="area_id"
                                        className="form-control"
                                        value={area_id}
                                        onChange={(e) => setAreaId(e.target.value)}
                                        required
                                    >
                                        <option value="">{"*Select Area"}</option>
                                        {areas.map((area) => (
                                            <option key={area.id} value={area.id}>
                                                {area.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="total_screens">Total Screens</label>
                                    <input
                                        type="number"
                                        id="total_screens"
                                        className="form-control"
                                        value={total_screens}
                                        onChange={(e) => setTotalScreens(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="total_seats">Total Seats</label>
                                    <input
                                        type="number"
                                        id="total_seats"
                                        className="form-control"
                                        value={total_seats}
                                        onChange={(e) => setTotalSeats(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="manager_id">Manager</label>
                                    <select
                                        id="manager_id"
                                        className="form-control"
                                        value={manager_id}
                                        onChange={(e) => setManagerId(e.target.value)}
                                        required
                                    >
                                        <option value="">{"*Select Manager"}</option>
                                        {managers.map((manager) => (
                                            <option key={manager.id} value={manager.id}>
                                                {manager.name}
                                            </option>
                                        ))}
                                    </select>
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

export default EditTheater;
