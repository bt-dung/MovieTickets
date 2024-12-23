import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
    const { userRole } = useUser();
    if (!userRole) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default PrivateRoute;
