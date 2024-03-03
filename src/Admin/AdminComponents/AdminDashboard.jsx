import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../stock/logomain.png";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { IoMdCloudOutline } from "react-icons/io";

function AdminDashboard() {
  return (
    <div className="adminDash">
      <NavLink to="/adminHome" className="logo-container">
        <img src={logo} alt="evanis-interior-logo" />
        <p className="logo">
          <span>EVANIS</span> INTERIORS
        </p>
      </NavLink>

      <div className="adminDash-links">
        <NavLink>
          <MdOutlineDashboard /> <h2>Dashboard</h2>
        </NavLink>
        <NavLink>
          <IoIosNotificationsOutline /> <h2>Notifications</h2>
        </NavLink>

        <div className="adminDash-shop">
          <h1>Shop</h1>
          <NavLink>
            <IoCloudUploadOutline /> <h2>Orders</h2>
          </NavLink>
          <NavLink>
            <CiCircleList /> <h2>Post</h2>
          </NavLink>
          <NavLink>
            <IoMdCloudOutline /> <h2>Uploads</h2>
          </NavLink>
        </div>
        <div className="adminDash-masterclass">
          <h1>Masterclass</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
