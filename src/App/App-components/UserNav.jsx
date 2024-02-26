import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../stock/logomain.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

function UserNav() {
  return (
    <div className="userNavbar">
      <div className="userNav-container">
        <NavLink to="/userDashboard" className="logo-container">
          <img src={logo} alt="evanis-interior-logo" />
          <p className="logo">
            <span>EVANIS</span> INTERIORS
          </p>
        </NavLink>

        <div className="userNavLinks">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to="/store"
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to="/userMasterclass"
            >
              Masterclass
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to="/shop"
            >
              Get Help
            </NavLink>
          </li>
        </div>

        <div className="userControls">
          <IoIosNotificationsOutline className="app-icon desktop-view notifs" />
          <AiOutlineShoppingCart className="app-icon desktop-view cart" />
          <CiUser className="app-icon user" />
        </div>
      </div>
    </div>
  );
}

export default UserNav;
