import React, { createContext, useState, useContext, useEffect } from "react";
import TokenService from "../service/TokenService";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const user = TokenService();
        setUserRole(user.role_name);
    }, []);

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};