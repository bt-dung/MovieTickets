import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiTheater,
  mdiAccount,
  mdiFilmstrip,
  mdiTicket,
  mdiHeadphones,
  mdiCalendarMonthOutline,
} from "@mdi/js";
import logoAdmin from "../../../../assets/images/logo/logo1.png";
const SideBar = () => {
  return (
    <>
      <div className="left-side-menu">
        <a href="dashboard" className="logo text-center">
          <span className="logo-lg">
            <img src={logoAdmin} alt="" height="80" />
          </span>
        </a>
        <div className="h-100" id="left-side-menu-container" data-simplebar>
          <ul className="metismenu side-nav">
            <li className="side-nav-item">
              <a href="dashboard" className="side-nav-link">
                <Icon path={mdiViewDashboard} size={1} />
                <span> Dashboard </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="users" className="side-nav-link">
                <Icon path={mdiAccount} size={1} />
                <span> Users </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="movie" className="side-nav-link">
                <Icon path={mdiFilmstrip} size={1} />
                <span> Movies </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="theater" className="side-nav-link">
                <Icon path={mdiTheater} size={1} />
                <span> Theater </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="schedule" className="side-nav-link">
                <Icon path={mdiCalendarMonthOutline} size={1} />
                <span> Schedule </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="ticket" className="side-nav-link">
                <Icon path={mdiTicket} size={1} />
                <span> Ticket </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="service" className="side-nav-link">
                <Icon path={mdiHeadphones} size={1} />
                <span> Service </span>
              </a>
            </li>
          </ul>

          <div className="clearfix"></div>
        </div>
      </div>
      {true && <div className="modal">Test</div>}
    </>
  );
};
export default SideBar;
