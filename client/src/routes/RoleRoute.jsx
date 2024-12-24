import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TokenService from '../service/TokenService';

const RoleRoute = ({ children, allowedRoles }) => {
    const [role, setRole] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = await TokenService();
            setRole(user.role);
        };
        fetchUserRole();
    }, []);

    useEffect(() => {
        if (role) {
            const authorized = allowedRoles.includes(role);
            setIsAuthorized(authorized);
            if (!authorized) {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'You cannot perform this operation!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    }, [role, allowedRoles]);
    if (isAuthorized === null) return null;
    return isAuthorized ? children : <Navigate to="/admin" replace />;
};

export default RoleRoute;
