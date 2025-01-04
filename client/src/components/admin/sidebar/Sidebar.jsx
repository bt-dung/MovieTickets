import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column bg-light p-3"
      style={{ height: "100vh", width: "250px" }}
    >
      <h5 className="text-black">Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/user" className="nav-link text-dark">
            User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/movie" className="nav-link text-dark">
            Movies
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/theater" className="nav-link text-dark">
            Theater
          </Link>
          <Link to="/admin/schedule" className="nav-link text-dark">
            Schedule
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/tickets" className="nav-link text-dark">
            Ticket
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/services" className="nav-link text-dark">
            Service
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
