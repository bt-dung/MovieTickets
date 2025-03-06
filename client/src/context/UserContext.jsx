import React, { createContext, useState, useContext, useEffect } from "react";
import TokenService from "../service/TokenService";

const UserContext = createContext();
export const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkUserLogin = () => {
        const token = localStorage.getItem("token");
        if (token && TokenService.isTokenValid()) {
            const userData = TokenService.decodeToken();
            setUser(userData);
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        checkUserLogin();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoggedIn, isLoading, checkUserLogin }}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

