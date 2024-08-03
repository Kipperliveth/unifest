import React, { useState } from "react";
import logo from "../stock/Unifest-logo-1.png";
import { NavLink, useLocation } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { PiReadCvLogoLight } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { LuRewind } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";

function Navbar({ setShowPopup }) {
  const [isVisible, SetIsVisible] = useState(false);

  const toggleVisibilty = () => {
    SetIsVisible(!isVisible);
  };

  const location = useLocation();

  const hiddenPaths = [
    "/marketplace",
    "/merch",
    "/address",
    "/userMasterclass",
    "/userDashboard",
    "/adminHome",
    "/adminNotifications",
    "/post", "/orders",
    "/cart",
    "/userProfile",
    '/notifications',
    "/uploads",
    "/onboarding",
    '/profilePic',
    '/editAddress',
    '/myorders',
    '/gethelp', '/editprofile', '/adminlog',
  ];

  const allPaths = [
    "/", "/marketplace", "/store", "/address", "/comingsoon", "/userDashboard",
    "/adminHome", "/adminNotifications", "/post", "/orders", "/cart", "/userProfile",
    "/notifications", "/uploads", "/onboarding", "/profilePic", "/editAddress",
    "/myorders", "/gethelp", "/adminlog", '/login', '/signup', '/memories', '/about', '/contact','/reset', '/merch-preview', "/tickets",
  ];

  const shouldHideComponent = hiddenPaths.includes(location.pathname) || !allPaths.includes(location.pathname);

  return (
    <div style={{ display: shouldHideComponent ? "none" : "block" }}>
      <div className="navigation ">
        <nav className=" navbar">

          <NavLink to="/" className="logo-container">
            <img src={logo} alt="unifest-logo" />
            <div className="logo">
              <p>UNI</p> FEST 
            </div>
          </NavLink>

          <ul className="page-links">
            
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to="/merch-preview"
              >
                Merch
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to="/about"
              >
                {" "}
                About
              </NavLink>
            </li>

               <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to="/memories"
              >
                {" "}
                Memories
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to="/contact"
              >
                {" "}
                Contact
              </NavLink>
            </li>

          </ul>

          <div className="app">

            <NavLink to='/tickets' className="login-btn">
              Tickets <IoTicketOutline className="logo-icon"/>
            </NavLink>

            <RiMenu4Fill
              className="app-icon mobile-view menu"
              onClick={toggleVisibilty}
            />
          </div>
        </nav>

        <div
          className={`mobilee-menu-container ${isVisible ? "is-visible" : ""} `}
        >
          <div className="mobile-menu">
            <div className="menu-content">
              <MdCancel onClick={toggleVisibilty} className="cancel-btn" />

              <div className="mobilepage-links">


                  <NavLink to="/about" onClick={toggleVisibilty}>
                <li>
                    About
                <PiReadCvLogoLight className="icon" />
                </li>
                  </NavLink>

                  <NavLink to="/merch-preview" onClick={toggleVisibilty}>
                <li>
                    Merch
                <IoShirtOutline className="icon"/>
                </li>
                  </NavLink>

                  <NavLink to="/memories" onClick={toggleVisibilty}>
                <li>
                    Mermories
                <LuRewind className="icon" />
                </li>
                  </NavLink>

                  <NavLink to="/contact" onClick={toggleVisibilty}>
                <li>
                    Contact
                <IoCallOutline className="icon"/>
                </li>
                  </NavLink>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
