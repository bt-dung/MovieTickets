import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    // const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [role, setRole] = useState(1);

    // const validateInput = () => {
    //     if (password.length < 8) {
    //         Swal.fire({
    //             title: 'Validation Error',
    //             text: 'Password must be at least 8 characters long.',
    //             icon: 'error',
    //             confirmButtonText: 'Okay',
    //         });
    //         return false;
    //     }

    //     if (phoneNumber.length !== 10) {
    //         Swal.fire({
    //             title: 'Validation Error',
    //             text: 'Phone number must be exactly 10 digits.',
    //             icon: 'error',
    //             confirmButtonText: 'Okay',
    //         });
    //         return false;
    //     }

    //     return true;
    // };

    // const handleAdd = async (e) => {
    //     e.preventDefault();

    //     if (!validateInput()) {
    //         return;
    //     }

    //     try {
    //         const response = await base.post('/users/registration', {
    //             username,
    //             password,
    //             phoneNumber,
    //             userRoles: [
    //                 {
    //                     role: {
    //                         id: role,
    //                     },
    //                 },
    //             ],
    //         });
    //         if (response.code === 1000) {
    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'User added successfully.',
    //                 icon: 'success',
    //                 confirmButtonText: 'Okay',
    //             });
    //             setUsername('');
    //             setPassword('');
    //             setPhoneNumber('');
    //             setRole(1);
    //         }
    //     } catch (error) {
    //         console.error('Error adding user:', error);
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Failed to add user. Please try again.',
    //             icon: 'error',
    //             confirmButtonText: 'Okay',
    //         });
    //     }
    // };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className="page-title">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate(-1)}
                                style={{ marginRight: '10px' }}
                            >
                                Back
                            </button>
                            Add users
                        </h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane show active" id="input-types-preview">
                                    <div className="row">
                                        <div className="col-12">
                                            <form onSubmit={handleAdd}>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="example-username">Username</label>
                                                    <input
                                                        type="text"
                                                        id="example-username"
                                                        name="example-username"
                                                        className="form-control"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="example-phone">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        id="example-phone"
                                                        name="example-phone"
                                                        className="form-control"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        className="form-control"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="example-select">Role</label>
                                                    <select
                                                        className="form-control"
                                                        id="example-select"
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                    >
                                                        <option value="1">Admin</option>
                                                        <option value="2">Manager</option>
                                                    </select>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-info float-right"
                                                >
                                                    Save
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;
