import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import logo from "../stock/Unifest-logo-1.png";

function openTawkTo() {
  if (window.Tawk_API) {
    window.Tawk_API.toggle();
  }
}

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll animation
  };
  const location = useLocation();

  const hiddenPaths = ["/adminHome", "/post", '/uploads', "/orders"]

  const allPaths = [
    "/", "/marketplace", "/merch", "/comingsoon", 
    "/adminHome", "/adminNotifications", "/post", "/orders", "/cart", "/userProfile",
    "/notifications", "/uploads", "/profilePic",
    "/myorders", "/gethelp","/adminlog", '/login', '/signup', '/memories', '/about', '/contact', '/reset', "/merch-preview", "/tickets",
  ];

  const shouldHideComponent = hiddenPaths.includes(location.pathname) || !allPaths.includes(location.pathname);

  return (
    <div style={{ display: shouldHideComponent ? "none" : "block" }}>
      <div className="footer-container">
        <div className="footer">
          <div className="footer-top">

            <NavLink  onClick={handleScrollToTop} className="logo-container">
            <img src={logo} alt="evanis-interior-logo" />
            <div className="logo">
              <p>UNI</p> FEST 
            </div>
          </NavLink>

            <div className="footer-links">
              <li>
                <NavLink to="/contact#faqs">FAQS</NavLink>
              </li>
              <li>
                <NavLink to='#' onClick={openTawkTo}>Get help</NavLink>
              </li>
              <li>
                <NavLink to='/merch-preview'>Merch</NavLink>
              </li>
              <li>
                <NavLink to='/contact'>Contact</NavLink>
              </li>
            </div>

            <div className="socials">
                      <a href="https://www.instagram.com/unifest001?igsh=Y3UzY3U3Ym44dmh6"><FaInstagram className="icon" /></a>
                      <a href="https://x.com/unifest001?t=v1LY_RCY5_DHDN7XBiMzqA&s=09"><FaXTwitter className="icon" /></a>
                      <a  href="mailto:unifest12@gmail.com?subject=Unifest%20'24%20Inquiry"><MdMailOutline className="icon" /></a>
                      <a href="https://www.tiktok.com/@unifest001?_t=8nv0OSN4tUL&_r=1"><IoLogoTiktok className="icon" /></a>
                    </div>
          </div>

          <div className="footer-bottom">
            &copy; 2024 unifest
            <div className="misc">
              <NavLink id="terms">terms of use</NavLink> |
              <NavLink id="policies"> privacy policy</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
