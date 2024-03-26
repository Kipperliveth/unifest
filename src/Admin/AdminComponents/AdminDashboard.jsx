import React, { useState, useEffect } from "react";
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
import { MdCancel } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function AdminDashboard() {
  const [user, setUser] = useState({});

  const [isOpen, setIsOpen] = useState(false); // State to track open/closed state

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle open/closed state
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  return (
    <div className="adminDash">
      <NavLink to="/adminHome" className="logo-container">
        <img src={logo} alt="evanis-interior-logo" />
        <p className="logo">
          <span>EVANIS</span> INTERIORS
        </p>
      </NavLink>

      <div className="adminDash-links desktop">
        <NavLink to="/adminHome">
          <MdOutlineDashboard className="dash-icon" /> <h3>Dashboard</h3>
        </NavLink>
        <NavLink to="/adminNotifications">
          <IoIosNotificationsOutline className="dash-icon" />{" "}
          <h3>Notifications</h3>
        </NavLink>

        <div className="adminDash-shop">
          <h2>Shop</h2>
          <NavLink to="/post">
            <IoCloudUploadOutline className="admin-shop-icon" /> <h3> Post</h3>
          </NavLink>
          <NavLink>
            <CiCircleList className="admin-shop-icon" /> <h3>Orders</h3>
          </NavLink>
          <NavLink to="/uploads">
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

          <NavLink>
            <img
              src={user?.photoURL}
              alt="adminDisplayPicture"
              className="admin-masterclass-icon"
            />
            <h3>{user?.displayName}</h3>
          </NavLink>
        </div>
      </div>

      <div className={`menu-container ${isOpen ? "open" : ""}`}>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? (
            <MdCancel className="mobile-admin-menu" />
          ) : (
            <AiOutlineMenu className="mobile-admin-menu" />
          )}

          <div className="menu-border">
            <div className="menu-links">
              <NavLink to="/adminHome">
                <MdOutlineDashboard className="admin-shop-icon" />
                <h3>Dashboard</h3>
              </NavLink>
              <NavLink>
                <IoIosNotificationsOutline className="admin-shop-icon" />
                <h3>Notifications</h3>
              </NavLink>
              {/* Your menu links with icons */}
              <NavLink to="/post">
                <IoCloudUploadOutline className="admin-shop-icon" />
                <h3>Post</h3>
              </NavLink>
              <NavLink to="/orders">
                <CiCircleList className="admin-shop-icon" /> <h3>Orders</h3>
              </NavLink>
              <NavLink to="/uploads">
                <IoMdCloudOutline className="admin-shop-icon" />
                <h3>Uploads</h3>
              </NavLink>

              <NavLink>
                <LiaChalkboardTeacherSolid className="admin-masterclass-icon" />
                <h3>Start Class</h3>
              </NavLink>
              <NavLink>
                <MdOutlineSchedule className="admin-masterclass-icon" />
                <h3>Schedules</h3>
              </NavLink>

              <NavLink>
                <img
                  src={user?.photoURL}
                  alt="adminDisplayPicture"
                  className="admin-masterclass-icon adminPic"
                />
                <h3>{user?.displayName}</h3>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
