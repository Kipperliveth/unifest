import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import logo from "../stock/Unifest-logo-1.png";

function Footer() {
  const location = useLocation();

  const hiddenPaths = ["/adminHome", "/post", '/uploads', "/orders"]

  const allPaths = [
    "/", "/marketplace", "/merch", "/userMasterclass",
    "/adminHome", "/adminNotifications", "/post", "/orders", "/cart", "/userProfile",
    "/notifications", "/uploads", "/profilePic",
    "/myorders", "/gethelp","/adminlog", '/login', '/signup', '/masterclass', '/about', '/contact', '/reset'
  ];

  const shouldHideComponent = hiddenPaths.includes(location.pathname) || !allPaths.includes(location.pathname);

  return (
    <div style={{ display: shouldHideComponent ? "none" : "block" }}>
      <div className="footer-container">
        <div className="footer">
          <div className="footer-top">

            <NavLink to="/" className="logo-container">
            <img src={logo} alt="evanis-interior-logo" />
            <div className="logo">
              <p>UNI</p> FEST 
            </div>
          </NavLink>

            <div className="footer-links">
              <li>
                <NavLink>FAQS</NavLink>
              </li>
              <li>
                <NavLink>Get help</NavLink>
              </li>
              <li>
                <NavLink>Merch</NavLink>
              </li>
              <li>
                <NavLink>Contact</NavLink>
              </li>
            </div>

            <div className="socials">
              <FaInstagram className="footer-icon" />
              <FaXTwitter className="footer-icon" />
              <FaWhatsapp className="footer-icon" />
              <MdMailOutline className="footer-icon" />
            </div>
          </div>

          <div className="footer-bottom">
            &copy; 2023 unifest
            <div>
              <NavLink id="terms">terms of use</NavLink> |{" "}
              <NavLink id="policies">privacy policy</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
