import React from "react";

const Header = () => {
  return (
    <>
      <div class="navbar-custom">
        <ul class="list-unstyled topbar-right-menu float-right mb-0">
          <li class="notification-list">
            <a class="nav-link right-bar-toggle" href="javascript: void(0);">
              <i class="dripicons-gear noti-icon"></i>
            </a>
          </li>

          <li class="dropdown notification-list">
            <a
              class="nav-link dropdown-toggle nav-user arrow-none mr-0"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <span class="account-user-avatar">
                <img
                  src="assets/images/users/avatar-1.jpg"
                  alt="user-image"
                  class="rounded-circle"
                />
              </span>
              <span>
                <span class="account-user-name">Messi</span>
                <span class="account-position">Admin</span>
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
              <div class="dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome !</h6>
              </div>
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <i class="mdi mdi-account-circle mr-1"></i>
                <span>My Account</span>
              </a>
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <i class="mdi mdi-logout mr-1"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
        <button class="button-menu-mobile open-left disable-btn">
          <i class="mdi mdi-menu"></i>
        </button>
        <div class="app-search dropdown d-none d-lg-block">
          <form>
            <div class="input-group">
              <input
                type="text"
                class="form-control dropdown-toggle"
                placeholder="Search..."
                id="top-search"
              />
              <span class="mdi mdi-magnify search-icon"></span>
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
