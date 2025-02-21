import React from "react";

const Footer = () => {
    return (<>
        <div className="newslater-section padding-bottom">
        </div>
        <div className="container">
            <div className="footer-top">
                <div className="footer-logo">
                    <a href="/starcinema/home">
                        <img src="../../../../assets/images/footer/footer-logo.png" alt="footer" />
                    </a>
                </div>
                <ul className="social-icons">
                    <li>
                        <a href="#0">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0" className="active">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <i className="fab fa-pinterest-p"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <i className="fab fa-google"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-bottom">
                <div className="footer-bottom-area">
                    <div className="left">
                        <h2 style={{ letterSpacing: "2px" }}>Theaters Complex</h2>
                        <div style={{ width: "300px", height: "5px", backgroundColor: "blue" }}></div>
                    </div>
                    <ul className="links">
                        <li>
                            <a href="#0">About</a>
                        </li>
                        <li>
                            <a href="#0">Terms Of Use</a>
                        </li>
                        <li>
                            <a href="#0">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#0">FAQ</a>
                        </li>
                        <li>
                            <a href="#0">Feedback</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div ></>
    );
};

export default Footer;
