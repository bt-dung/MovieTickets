import React, { useEffect, useState } from 'react';
import { fetchData, updateData } from '../../../../api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import "./EditUser.css"

const EditUser = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('userID');
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [numberphone, setPhoneNumber] = useState('');
    const [role_id, setRole] = useState('');
    const [verified, setVerify] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetchData(`/admin/user/${userId}`);
                setName(response.name);
                setEmail(response.email);
                setAddress(response.address);
                setDateOfBirth(response.date_of_birth);
                setPhoneNumber(response.numberphone);
                setRole(response.role_id);
                setVerify(response.verified);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateData(`admin/user/${userId}/update`, {
                name,
                email,
                address,
                date_of_birth,
                numberphone,
                role_id,
                verified
            });
            console.log("user-updated:", response);
            if (response.status === "SUCCESS") {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                navigate('/admin/users');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to edit user. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <>
            <div className="d-flex w-100 ">
                <div type="button"
                    className="btn mr-3 "
                    onClick={() => navigate(-1)}
                >
                    <Icon path={mdiArrowLeft} size={2} />
                </div>
                <h1 className="text-muted mb-3" > Edit User</h1>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
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
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        className="form-control"
                                        value={date_of_birth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="text"
                                        id="numberphone"
                                        className="form-control"
                                        value={numberphone}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3 row">
                                    <div className="col-md-6">
                                        <label htmlFor="role">Role</label>
                                        <select
                                            id="role"
                                            className="form-control"
                                            value={role_id}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value={1}>User</option>
                                            <option value={2}>Manager</option>
                                            <option value={3}>Admin</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="verified">Verified</label>
                                        <select
                                            id="verified"
                                            className="form-control custom-select"
                                            value={verified ? "true" : "false"}
                                            onChange={(e) => setVerify(e.target.value === "true")}
                                            required
                                        >
                                            <option value="true" >True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
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

export default EditUser;
