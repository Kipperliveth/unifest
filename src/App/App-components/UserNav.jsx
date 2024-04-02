import React, { useState, useEffect } from "react";
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
import { RiMenu4Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

function UserNav() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const [isVisible, SetIsVisible] = useState(false);

  const toggleVisibilty = () => {
    SetIsVisible(!isVisible);
  };

  const logout = async () => {
    if (auth.currentUser) {
      await signOut(auth);
      navigate("/login");
    } else {
      // Handle the scenario where the user is not logged in
      // For example, you might display an error message or redirect the user to the login page
      console.log("User is not logged in");
      navigate("/login");
    }
  };

  //bar display
  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const cartLink = () => {
    navigate("/cart");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  return (
    <div className="userNavbar">
      <div className="userNav-container">
        <NavLink to="/userDashboard" className="logo-container">
          <img src={logo} alt="evanis-interior-logo" />
          <p className="logo">
            <span>EVANIS</span> INTERIORS
          </p>
        </NavLink>

        <div className="userNavLinks desktop-content">
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

        <div className="userControls desktop-content">
          <IoIosNotificationsOutline className="app-icon desktop-view notifs" />
          <AiOutlineShoppingCart
            className="app-icon desktop-view cart"
            onClick={cartLink}
          />
          <img
            src={user && user.email ? user.photoURL : ''}
            alt="displayPicture"
            className="app-icon user"
            onClick={toggleUserInfo}
          />

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

        <RiMenu4Fill
          className="app-icon mobile-view menu"
          onClick={toggleVisibilty}
        />
      </div>

      <div
        className={` mobile-menu-container ${isVisible ? "is-visible" : ""} `}
      >
        <div className="mobile-menu">
          <div className="menu-content">
            <MdCancel onClick={toggleVisibilty} className="cancel-btn" />

            <span>
              <IoIosNotificationsOutline className="span-icon" />
              <AiOutlineShoppingCart className="span-icon" />
            </span>

            <div className="mobilepage-links">
              <li>
                <NavLink to="/shop" onClick={toggleVisibilty}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/masterclass" onClick={toggleVisibilty}>
                  Masterclass
                </NavLink>
              </li>
              <li>
                <NavLink to="/userProfile" onClick={toggleVisibilty}>
                  View profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleVisibilty}>
                  My Orders
                </NavLink>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
