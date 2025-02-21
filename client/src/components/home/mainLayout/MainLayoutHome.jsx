import React from "react";
import Header from "../header/HeaderHome";
import FooterHome from "../footer/FooterHome";
import "../../../../styles.scss";
import MovieCard from "../movie/MovieCard";
const MainLayoutHome = ({ children }) => {
  return (
    <>
      {/* <div class="overlay"></div>
      <a href="#0" class="scrollToTop">
        <i class="fas fa-angle-up"></i>
      </a> */}
      <header className="header-section">
        <Header />
      </header>


      <section style={{margin: "0 auto 100px"}}>{children}</section>

      

      <footer class="footer-section">
        <FooterHome />
      </footer>
    </>
  );
};

export default MainLayoutHome;
