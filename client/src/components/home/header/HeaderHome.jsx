import React from "react";
import { useUser } from "../../../context/UserContext";
import Icon from '@mdi/react';
import { mdiAccountArrowRight, mdiAccountBoxOutline, mdiLogout } from '@mdi/js';
import { NavLink } from "react-router-dom";
const HeaderHome = () => {
    const { user } = useUser();
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
                <ul className="menu">
                    <li>
                        <NavLink to="/starcinema/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/starcinema/movies" className={({ isActive }) => isActive ? 'active' : ''}>Movie</NavLink>
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
                    <li className="header-button pr-0">
                        <a href="#0">{user.name}</a>
                        <ul class="dropdown-menu" >
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i className="me-2">
                                        <Icon path={mdiAccountBoxOutline} size={1} />
                                    </i>
                                    <span>My Information</span>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="/login" onClick={handleLogout}>
                                    <i className="me-2">
                                        <Icon path={mdiLogout} size={1} />
                                    </i>
                                    <span>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="header-bar d-lg-none">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div></>
    );
}

export default HeaderHome;
