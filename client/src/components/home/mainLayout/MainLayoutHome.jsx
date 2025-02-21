import React from 'react'
import Header from '../header/HeaderHome'
import Footer from "../footer/Footer"
import "../../../../styles.scss";
import MovieCard from "../movie/MovieCard";
const MainLayoutHome = ({ children }) => {
    return (
        <>
            <div class="preloader">
                <div class="preloader-inner">
                    <div class="preloader-icon">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="overlay"></div>
            <a href="#0" class="scrollToTop">
                <i class="fas fa-angle-up"></i>
            </a>
            <header className="header-section">
                <Header />
            </header>
            {children}
            <footer className="footer-section">
                <Footer />
            </footer>

        </>
    )
}

export default MainLayoutHome;
