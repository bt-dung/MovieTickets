import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { user, isLoggedIn } = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  return (
    <>
      {isLoggedIn ? (
        <>
          <section className="banner-section">
            <div className="banner-bg bg_img bg-fixed" data-background="../../../public/assets/images/banner/banner01.jpg"></div>
            <div className="container">
              <div className="banner-content">
                <h1 className="title  cd-headline clip"><span className="d-block">book your</span> tickets for
                  <span className="color-theme cd-words-wrapper p-0 m-0">
                    <b className="is-visible">Movie</b>
                    <b>Event</b>
                    <b>Sport</b>
                  </span>
                </h1>
                <p>Safe, secure, reliable ticketing.Your ticket to live entertainment!</p>
              </div>
            </div>
          </section>

          <section className="search-ticket-section padding-top pt-lg-0">
            <div className="container">
              <div className="search-tab bg_img" data-background="../../../assets/images/ticket/ticket-bg01.jpg">
                <div className="row align-items-center mb--20">
                  <div className="col-lg-6 mb-20">
                    <div className="search-ticket-header">
                      <h6 class="category">welcome to Boleto </h6>
                      <h3 class="title">what are you looking for</h3>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-20">
                    <ul class="tab-menu ticket-tab-menu">
                      <li class="active">
                        <div class="tab-thumb">
                          <img src="../../../assets/images/ticket/ticket-tab01.png" alt="ticket" />
                        </div>
                        <span>movie</span>
                      </li>
                      <li>
                        <div class="tab-thumb">
                          <img src="../../../assets/images/ticket/ticket-tab02.png" alt="ticket" />
                        </div>
                        <span>events</span>
                      </li>
                      <li>
                        <div class="tab-thumb">
                          <img src="../../../assets/images/ticket/ticket-tab03.png" alt="ticket" />
                        </div>
                        <span>sports</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="tab-area">
                  <div class="tab-item active">
                    <form class="ticket-search-form">
                      <div class="form-group large">
                        <input type="text" placeholder="Search for Movies" />
                        <button type="submit"><i class="fas fa-search"></i></button>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/city.png" alt="ticket" />
                        </div>
                        <span className="type">city</span>
                        <select className="select-bar">
                          <option value="london">London</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/date.png" alt="ticket" />
                        </div>
                        <span class="type">date</span>
                        <select class="select-bar">
                          <option value="26-12-19">23/10/2020</option>
                          <option value="26-12-19">24/10/2020</option>
                          <option value="26-12-19">25/10/2020</option>
                          <option value="26-12-19">26/10/2020</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/cinema.png" alt="ticket" />
                        </div>
                        <span class="type">cinema</span>
                        <select class="select-bar">
                          <option value="Awaken">Awaken</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div class="tab-item">
                    <form class="ticket-search-form">
                      <div class="form-group large">
                        <input type="text" placeholder="Search for Events" />
                        <button type="submit"><i class="fas fa-search"></i></button>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/city.png" alt="ticket" />
                        </div>
                        <span class="type">city</span>
                        <select class="select-bar">
                          <option value="london">London</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/date.png" alt="ticket" />
                        </div>
                        <span class="type">date</span>
                        <select class="select-bar">
                          <option value="26-12-19">23/10/2020</option>
                          <option value="26-12-19">24/10/2020</option>
                          <option value="26-12-19">25/10/2020</option>
                          <option value="26-12-19">26/10/2020</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/cinema.png" alt="ticket" />
                        </div>
                        <span class="type">event</span>
                        <select class="select-bar">
                          <option value="angular">angular</option>
                          <option value="startup">startup</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="Last-First">Last-First</option>
                          <option value="wish">wish</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div class="tab-item">
                    <form class="ticket-search-form">
                      <div class="form-group large">
                        <input type="text" placeholder="Search fo Sports" />
                        <button type="submit"><i class="fas fa-search"></i></button>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/city.png" alt="ticket" />
                        </div>
                        <span class="type">city</span>
                        <select class="select-bar">
                          <option value="london">London</option>
                          <option value="dhaka">dhaka</option>
                          <option value="rosario">rosario</option>
                          <option value="madrid">madrid</option>
                          <option value="koltaka">kolkata</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/date.png" alt="ticket" />
                        </div>
                        <span class="type">date</span>
                        <select class="select-bar">
                          <option value="26-12-19">23/10/2020</option>
                          <option value="26-12-19">24/10/2020</option>
                          <option value="26-12-19">25/10/2020</option>
                          <option value="26-12-19">26/10/2020</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <div class="thumb">
                          <img src="../../../assets/images/ticket/cinema.png" alt="ticket" />
                        </div>
                        <span class="type">sports</span>
                        <select class="select-bar">
                          <option value="football">football</option>
                          <option value="cricket">cricket</option>
                          <option value="cabadi">cabadi</option>
                          <option value="madrid">madrid</option>
                          <option value="gadon">gadon</option>
                          <option value="rome">rome</option>
                          <option value="khoksa">khoksa</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <h1>Please log in.</h1>
      )}
    </>
  );
};

export default Home;
