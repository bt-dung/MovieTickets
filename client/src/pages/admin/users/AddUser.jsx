import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const AddUser = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [numberphone, setPhoneNumber] = useState('');
    const [role, setRole] = useState(1);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateInput = () => {
        if (!name || !email || !password || !address || !numberphone || !dateOfBirth) {
            Swal.fire({
                title: 'Validation Error',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        if (!isValidEmail(email)) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Please enter a valid email address.',
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
            const response = await postData('/api/v1/register', {
                name,
                email,
                numberphone,
                date_of_birth: dateOfBirth,
                address,
                password,
                role,
            });
            console.log("user-added:", response);
            if (response.status === "SUCCESS") {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setName('');
                setEmail('');
                setPassword('');
                setDateOfBirth('');
                setAddress('');
                setPhoneNumber('');
                setRole(1);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add user. Please try again.',
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
                <h1 className="text-muted mb-3" > Add User</h1>

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
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        value={numberphone}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="phone">Address</label>
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
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="date_of_birth">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        className="form-control"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        id="role"
                                        className="form-control"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="1">User</option>
                                        <option value="2">Manager</option>
                                        <option value="3">Admin</option>
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

export default AddUser;
