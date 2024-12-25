import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default PrivateRoute;
