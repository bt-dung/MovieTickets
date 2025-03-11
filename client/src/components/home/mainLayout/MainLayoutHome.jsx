import React from 'react'
import Header from '../header/HeaderHome'
import Footer from "../footer/Footer"
import "../../../../styles.scss";
const MainLayoutHome = ({ children }) => {
    return (
        <>
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
