import React from "react";
import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useLocation } from "react-router-dom";

const HeaderHome = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const { user } = useUser();
    console.log("user2:", user);
    return (
        <>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo">
                        <a href="/starcinema/home">
                            <img src="assets\images\logo\logo1.png" alt="logo" />
                        </a>
                    </div>
                    <ul className="menu">
                        <li>
                            <a href="/starcinema/home" className="active">Home</a>
                        </li>
                        <li>
                            <a href="/starcinema/movies">Movie</a>
                        </li>
                        <li>
                            <a href="/starcinema/tickets">Ticket</a>
                        </li>
                        <li>
                            <a href="/starcinema/theaters">Theater</a>
                        </li>
                        <li>
                            <a href="#0">Events</a>
                        </li>
                        <li>
                            <a href="contact.html">Contact</a>
                        </li>
                        <li className="header-button pr-0">
                            <a href="#0">{name}</a>
                            <ul class="dropdown-menu" >
                                <li><a class="dropdown-item" href="#">Tùy chọn 1</a></li>
                                <li><a class="dropdown-item" href="#">Tùy chọn 2</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HeaderHome;
