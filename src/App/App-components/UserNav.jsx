import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../stock/logomain.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BsBox2 } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";

function UserNav() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  //bar display
  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const cartLink = () => {
    navigate("/cart");
  };

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
          <AiOutlineShoppingCart
            className="app-icon desktop-view cart"
            onClick={cartLink}
          />
          <CiUser className="app-icon user" onClick={toggleUserInfo} />

          {showUserInfo && (
            <div className="currentUserInfo">
              <div className="currentUserInfo-content">
                <NavLink>
                  <LiaUserEditSolid className="icon" />
                  <p>View Profile</p>
                </NavLink>
                <NavLink className="icon">
                  <BsBox2 /> <p>My Orders</p>
                </NavLink>
                <button onClick={logout}>Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserNav;
