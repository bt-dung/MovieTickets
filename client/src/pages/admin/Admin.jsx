import React from "react";
import Header from "../../components/admin/header/Header";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import User from "../admin/users/Users";

const Admin = () => {
  
  return (
    <div className="d-flex flex-column bg-white">
      <Header />
      <div className="d-flex">
        <Sidebar />

        <div className="p-4" style={{ flex: 1 }}>
          <User />
        </div>
      </div>
    </div>
  );
};

export default Admin;
