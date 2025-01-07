import Icon from "@mdi/react";
import { mdiViewDashboard, mdiTheater, mdiAccount, mdiFilmstrip } from "@mdi/js";
import logoAdmin from "../../../../assets/images/logo/logo1.png";
import { useUser } from "../../../context/UserContext";
const SideBar = () => {
  const { user } = useUser();
  const userRole = user?.role;
  const theaterId = user.theater_id;
  return (
    <>
      <div className="left-side-menu">
        <a href="/dashboard" className="logo text-center">
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
              <a href="/admin/users" className="side-nav-link">
                <Icon path={mdiAccount} size={1} />
                <span> Users </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="/admin/movie" className="side-nav-link">
                <Icon path={mdiFilmstrip} size={1} />
                <span> Movies </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a
                href={userRole === "admin_role" ? "/admin/theaters" : `/admin/detail-theater/${theaterId}`}
                className="side-nav-link"
              >
                <Icon path={mdiTheater} size={1} />
                <span> Theater </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="branches" className="side-nav-link">
                <i className="dripicons-chevron-right"></i>
                <span> Schedule </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="rooms" className="side-nav-link">
                <i className="dripicons-chevron-right"></i>
                <span> Rooms </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="tenants" className="side-nav-link">
                <i className="dripicons-chevron-right"></i>
                <span> Tenants </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="invoices" className="side-nav-link">
                <i className="dripicons-chevron-right"></i>
                <span> Invoices </span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="reports" className="side-nav-link">
                <i className="dripicons-chevron-right"></i>
                <span> Reports </span>
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
