import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../stock/logomain.png";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { IoMdCloudOutline } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineSchedule } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false); // State to track open/closed state

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle open/closed state
  };

  return (
    <div className="adminDash">
      <NavLink to="/adminHome" className="logo-container">
        <img src={logo} alt="evanis-interior-logo" />
        <p className="logo">
          <span>EVANIS</span> INTERIORS
        </p>
      </NavLink>

      <div className="mobile-content" onClick={toggleMenu}>
        <AiOutlineMenu className="mobile-admin-menu" />
      </div>

      {/* {isOpen && ( */}
        <div className={`adminDash-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/adminHome">
            <MdOutlineDashboard className="dash-icon" /> <h3>Dashboard</h3>
          </NavLink>
          <NavLink to="/adminNotifications">
            <IoIosNotificationsOutline className="dash-icon" />{" "}
            <h3>Notifications</h3>
          </NavLink>

          <div className="adminDash-shop">
            <h2>Shop</h2>
            <NavLink>
              <IoCloudUploadOutline className="admin-shop-icon" />{" "}
              <h3>Orders</h3>
            </NavLink>
            <NavLink>
              <CiCircleList className="admin-shop-icon" /> <h3>Post</h3>
            </NavLink>
            <NavLink>
              <IoMdCloudOutline className="admin-shop-icon" /> <h3>Uploads</h3>
            </NavLink>
          </div>

          <div className="adminDash-masterclass">
            <h2>Masterclass</h2>
            <NavLink>
              <LiaChalkboardTeacherSolid className="admin-masterclass-icon" />{" "}
              <h3>Start a Class</h3>
            </NavLink>
            <NavLink>
              <MdOutlineSchedule className="admin-masterclass-icon" />
              <h3>Schedules</h3>
            </NavLink>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default AdminDashboard;
