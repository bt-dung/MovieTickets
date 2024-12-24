import React, { createContext, useState, useContext, useEffect } from "react";
import TokenService from "../service/TokenService";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(async () => {
        const user = await TokenService();
        setUserRole(user.role);
    }, []);

    return (
        <UserContext.Provider value={{ userRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};