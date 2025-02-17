import React from 'react'
import Header from '../header/HeaderHome'
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

            <section class="banner-section">
                {children}
            </section>
        </>
    )
}

export default MainLayoutHome;
