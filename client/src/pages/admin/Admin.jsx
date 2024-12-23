import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/admin/header/Header";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import User from "../admin/users/Users";

const Admin = () => {
  const Home = () => <h1>Welcome to the Home Page</h1>;
  const Profile = () => <h1>Your Profile Information</h1>;
  const Settings = () => <h1>Settings Page</h1>;
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
