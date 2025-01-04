import Icon from '@mdi/react';
import { mdiViewDashboard, mdiChevronRight } from '@mdi/js';
const SideBar = () => {
  return (
    <>
      <div class="left-side-menu d-flex flex-column vh-100">
        <a href="/admin/dashboard" class="logo text-center mb-3">
          <span class="logo-lg">
            <img src="../../../../assets/images/logo/logo1.png" alt="" height="80" width="auto" />
          </span>
        </a>
        <div class="h-100" id="left-side-menu-container" data-simplebar>
          <ul class="metismenu side-nav">
            <li class="side-nav-item">
              <a href="dashboard" class="side-nav-link">
                <Icon path={mdiViewDashboard} size={1} />
                <span> Dashboard </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="users" class="side-nav-link">
                <Icon path={mdiChevronRight} size={1} />
                <span> Users </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="equipments" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Movies </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="services" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Theater </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="branches" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Schedule </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="rooms" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Rooms </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="tenants" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Tenants </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="invoices" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Invoices </span>
              </a>
            </li>

            <li class="side-nav-item">
              <a href="reports" class="side-nav-link">
                <i class="dripicons-chevron-right"></i>
                <span> Reports </span>
              </a>
            </li>
          </ul>

          <div class="clearfix"></div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
