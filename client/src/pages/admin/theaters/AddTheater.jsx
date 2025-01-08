import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData, fetchData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const AddTheater = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [areaId, setAreaId] = useState('');
    const [totalScreens, setTotalScreens] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);
    const [managerId, setManagerId] = useState('');
    const [areas, setAreas] = useState([]);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const areasResponse = await fetchData('/api/v1/areas');
                console.log(areasResponse);
                setAreas(areasResponse.data);

                const managersResponse = await fetchData('/admin/managers');
                setManagers(managersResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    const validateInput = () => {
        if (!name || !address || !areaId || !totalScreens || !totalSeats || !managerId) {
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

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        try {
            const response = await postData('/api/v1/create-theater', {
                name,
                address,
                area_id: areaId,
                total_screens: totalScreens,
                total_seats: totalSeats,
                manager_id: managerId,
            });

            console.log("theater-added:", response);

            if (response.status === "SUCCESS") {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setName('');
                setAddress('');
                setAreaId('');
                setTotalScreens(0);
                setTotalSeats(0);
                setManagerId('');
            }
        } catch (error) {
            console.error('Error adding theater:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message,
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
                <h1 className="text-muted mb-3">Add Theater</h1>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleAdd}>
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
                                        value={areaId}
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
                                        value={totalScreens}
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
                                        value={totalSeats}
                                        onChange={(e) => setTotalSeats(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="manager_id">Manager</label>
                                    <select
                                        id="manager_id"
                                        className="form-control"
                                        value={managerId}
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

export default AddTheater;