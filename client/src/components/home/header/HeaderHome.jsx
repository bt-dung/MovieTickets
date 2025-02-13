import React from "react";
import { useUser } from "../../../context/UserContext";
import Icon from '@mdi/react';
import { mdiAccountArrowRight, mdiAccountBoxOutline, mdiLogout } from '@mdi/js';
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
                        <a href="/starcinema/home" className="active">Home</a>
                    </li>
                    <li>
                        <a href="/starcinema/movies" >Movie</a>
                    </li>
                    <li>
                        <a href="/starcinema/tickets" >Ticket</a>
                    </li>
                    <li>
                        <a href="/starcinema/theaters" >Theater</a>
                    </li>
                    <li>
                        <a href="#0" >Events</a>
                    </li>
                    <li>
                        <a href="contact.html" >Contact</a>
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
