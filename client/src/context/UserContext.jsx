import React, { createContext, useState, useContext, useEffect } from "react";
import TokenService from "../service/TokenService";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const checkUserLogin = () => {
        const token = TokenService.getToken();
        console.log("TokenService.isTokenValid:", TokenService.isTokenValid());
        if (token && TokenService.isTokenValid()) {
            const userData = TokenService.decodeToken();
            setUser(userData);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            navigate("/login");
        }
    };

    useEffect(() => {
        checkUserLogin();
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, isLoggedIn, checkUserLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};