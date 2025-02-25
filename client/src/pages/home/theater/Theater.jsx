import SearchContent from "../../../components/home/movie/SearchContent";
import { useState } from "react";
const Theater = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    
    const handleCityChange = () => {

    }
    return (
        <>
            <section className="banner-section">
                <div className="banner-bg bg_img bg-fixed" data-background="../../../assets/images/banner/banner01.jpg"></div>
                <div className="container">
                    <div className="search-tab bg_img" data-background="../../../assets/images/ticket/ticket-bg01.jpg">
                        <div className="row align-items-center mb--20">
                            <div className="col-lg-6 mb-20">
                                <div className="search-ticket-header">
                                    <h6 className="category">welcome to Boleto</h6>
                                    <h3 className="title">what are you looking for</h3>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-20">
                                <ul className="tab-menu ticket-tab-menu">
                                    <li className="active">
                                        <div className="tab-logo">
                                            <img src="../../../assets/images/ticket/movie-theater.png" alt="ticket" />
                                        </div>
                                        <span>theater</span>
                                    </li>
                                    <div className="search-container">
                                        <form className="ticket-search-form">
                                            <div className="form-group large">
                                                <input
                                                    type="text"
                                                    placeholder="Search for Theaters"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                {searchTerm && (
                                                    <button type="button" className="clear-btn" onClick={() => setSearchTerm('')}>
                                                        &times;
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                        {searchTerm && <SearchContent results={results} />}
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-container">
                            <div className="filter-group">
                                <div class="thumb">
                                    <img src="../../../../assets/images/ticket/city.png" alt="ticket" />
                                </div>
                                <span class="type">city</span>
                                <select className="select-bar" value={selectedCity} onChange={handleCityChange}>
                                    <option value="" disabled>Choose City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Theater;