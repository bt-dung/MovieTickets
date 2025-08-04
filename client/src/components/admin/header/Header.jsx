import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import Icon from '@mdi/react';
import { mdiAccountArrowRight, mdiAccountBoxOutline, mdiLogout, mdiBell } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification, removeNotification } from '../../../redux/slices/notification';

const Header = () => {
  const { user } = useUser();
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    if (user?.role) {
      setRole(user.role === "admin_role" ? "Admin" : "Manager");
    }
  }, [user]);

  return (
    <nav className="navbar-custom navbar-expand-lg bg-body-tertiary h-auto">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown d-flex align-items-center">
              <a className='nav-link dropdown-toggle arrow-none mr-3 position-relative'>
                {notifications.unreadCount > 0 && (
                <span className='text-danger position-absolute' style={{
                  top: '-8px',
                  right: '-8px',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  padding: '2px 6px',
                  fontWeight: 'bold',
                }}>{notifications.unreadCount}</span>)}
                <span>
                  <Icon path={mdiBell} size={1} />
                </span>
              </a>
              <a
                className="nav-link dropdown-toggle nav-user arrow-none"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <span class="account-user-avatar">
                  <Icon path={mdiAccountArrowRight} size={1} />
                </span>
                <span>
                  <span className="account-user-name">{user.name || "Guest"}</span>
                  <span className="account-position ms-2">{role}</span>
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0 text-muted">Welcome!</h6>
                  </div>
                </li>
                <li>
                  <a href="#" className="dropdown-item notify-item">
                    <i className="me-2">
                      <Icon path={mdiAccountBoxOutline} size={1} />
                    </i>
                    <span>My Account</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown-item notify-item"
                    onClick={handleLogout}
                  >
                    <i className="me-2">
                      <Icon path={mdiLogout} size={1} />
                    </i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
