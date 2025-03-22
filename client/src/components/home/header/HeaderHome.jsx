import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import Icon from '@mdi/react';
import { mdiAccountArrowRight, mdiAccountBoxOutline, mdiLogout } from '@mdi/js';
import { NavLink } from "react-router-dom";
const HeaderHome = () => {
    const { user } = useUser();
    const [isAction, setIsAction] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = (e) => {
        try {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.reload();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (<>
        <div className="container">
            <div className="header-wrapper">
                <div className="logo1">
                    <a href="/starcinema/home">
                        <img src="../../../../assets/images/logo/logo.png" alt="logo" />
                    </a>
                </div>
                <ul className={`menu ${isAction ? "active" : ""}`}>
                    <li>
                        <NavLink to="/starcinema/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/starcinema/movie" className={({ isActive }) => isActive ? 'active' : ''}>Movie</NavLink>
                    </li>
                    <li>
                        <NavLink to="/starcinema/tickets" className={({ isActive }) => isActive ? 'active' : ''}>Ticket</NavLink>
                    </li>
                    <li>
                        <NavLink to="/starcinema/theater" className={({ isActive }) => isActive ? 'active' : ''}>Theater</NavLink>
                    </li>
                    <li>
                        <NavLink to="/starcinema/events" className={({ isActive }) => isActive ? 'active' : ''}>Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="/starcinema/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                    </li>
                    <li className="header-button pr-0" onClick={() => setIsOpen(!isOpen)}>
                        <a href="#0">{user.name}</a>
                        <ul className={`dropdown-menu ${isOpen ? "show" : ""}`} style={{ position: "absolute" }}>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="me-2">
                                        <Icon path={mdiAccountBoxOutline} size={1} />
                                    </i>
                                    <span>My Information</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/login" onClick={handleLogout}>
                                    <i className="me-2">
                                        <Icon path={mdiLogout} size={1} />
                                    </i>
                                    <span>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className={`header-bar d-lg-none ${isAction ? "active" : ""}`} onClick={() => setIsAction(!isAction)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div></>
    );
}

export default HeaderHome;
