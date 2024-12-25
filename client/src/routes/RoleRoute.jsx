import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';

const RoleRoute = ({ children, allowedRoles }) => {
    const { userRole } = useUser();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        if (userRole) {
            const authorized = allowedRoles.includes(userRole);
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
    }, [userRole, allowedRoles]);
    if (isAuthorized === null) return null;
    return isAuthorized ? children : <Navigate to="/admin" replace />;
};

export default RoleRoute;
