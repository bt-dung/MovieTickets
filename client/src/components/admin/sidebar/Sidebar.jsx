import Icon from "@mdi/react";
import { mdiViewDashboard, mdiTheater, mdiAccount, mdiFilmstrip, mdiCalendarEditOutline, mdiVideoVintage, mdiInvoiceListOutline, mdiFoodForkDrink } from "@mdi/js";
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
            <img src="/assets/images/logo/logo3.jpeg" alt="" height="80" />
          </span>
        </a>
        <div className="h-100" id="left-side-menu-container" data-simplebar>
          <ul className="metismenu side-nav">
            <li className="side-nav-item mt-5">
              <a href="/admin/dashboard" className="side-nav-link d-flex align-items-center py-2">
                <Icon path={mdiViewDashboard} size={1.5} className="me-3" />
                <span>Dashboard</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="/admin/users" className="side-nav-link d-flex align-items-center py-2">
                <Icon path={mdiAccount} size={1.5} className="me-3" />
                <span>Users</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a href="/admin/movie" className="side-nav-link d-flex align-items-center py-2">
                <Icon path={mdiFilmstrip} size={1.5} className="me-3" />
                <span>Movies</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a
                href={userRole === "admin_role" ? "/admin/theater" : `/admin/detail-theater/${theaterId}`}
                className="side-nav-link d-flex align-items-center py-2"
              >
                <Icon path={mdiTheater} size={1.5} className="me-3" />
                <span>Theater</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a
                href={userRole === "admin_role" ? "/admin/schedules" : `/admin/detail-schedule/${theaterId}`}
                className="side-nav-link d-flex align-items-center py-2"
              >
                <Icon path={mdiCalendarEditOutline} size={1.5} className="me-3" />
                <span>Schedule</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a
                href={userRole === "admin_role" ? "/admin/screens" : `/admin/detail-screen/${theaterId}`}
                className="side-nav-link d-flex align-items-center py-2"
              >
                <Icon path={mdiVideoVintage} size={1.5} className="me-3" />
                <span>Screens</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a
                href={userRole === "admin_role" ? "/admin/invoices" : `/admin/detail-invoice/${theaterId}`}
                className="side-nav-link d-flex align-items-center py-2"
              >
                <Icon path={mdiInvoiceListOutline} size={1.5} className="me-3" />
                <span>Invoices</span>
              </a>
            </li>

            <li className="side-nav-item">
              <a
                href="/admin/services"
                className="side-nav-link d-flex align-items-center py-2"
              >
                <Icon path={mdiFoodForkDrink} size={1.5} className="me-3" />
                <span>Services</span>
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
