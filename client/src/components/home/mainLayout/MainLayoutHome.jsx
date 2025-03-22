import React, { useState, useEffect } from 'react'
import Header from '../header/HeaderHome'
import Footer from "../footer/Footer"
import "../../../../styles.scss";
const MainLayoutHome = ({ children }) => {
    const [header, setHeader] = useState(null);
    const [isAction, setIsAction] = useState(false);
    useEffect(() => {
        setHeader(document.querySelector(".header-section"));
    }, []);

    useEffect(() => {
        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY > 0) {
                header.classList.add("header-active");
                setIsAction(true);
            } else {
                setIsAction(false);
                header.classList.remove("header-active");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [header]);
    return (
        <>
            <div className="overlay"></div>
            <a href="#0" className={`scrollToTop ${isAction ? "active" : ""}`}>
                <i className="fas fa-angle-up"></i>
            </a>
            <header className="header-section">
                <Header />
            </header>
            {children}
            <footer className="footer-section">
                <Footer />
            </footer>
        </>
    );
};

export default MainLayoutHome;

