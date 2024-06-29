import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import logo from "../../stock";
import logo from "../../stock/Unifest-logo-1.png";

import { MdOutlineDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdCloudOutline } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineSchedule } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase-config";
import { CiDeliveryTruck } from "react-icons/ci";
import { collection,onSnapshot } from "firebase/firestore";
import { txtdb } from "../../firebase-config";



function AdminDashboard() {
  const [user, setUser] = useState({});
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false); // State to track open/closed state

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle open/closed state
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const ordersCollection = collection(txtdb, "orders");
    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      setOrdersCount(snapshot.docs.length);
    }, (error) => {
      console.error("Error fetching orders:", error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const ordersCollection = collection(txtdb, "notifications");
    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      setNotificationsCount(snapshot.docs.length);
    }, (error) => {
      console.error("Error fetching orders:", error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="adminDash">
      <NavLink to="/adminHome" className="logo-container">
            <img src={logo} alt="evanis-interior-logo" />
            <div className="logo">
              <p>UNI</p> FEST 
            </div>
          </NavLink>

      <div className="adminDash-links desktop">
        <NavLink to="/adminHome">
          <MdOutlineDashboard className="dash-icon" /> <h3>Dashboard</h3>
        </NavLink>
        <NavLink to="/adminNotifications">
          <IoIosNotificationsOutline className="dash-icon" />{" "}
          <h3>Notifications {notificationsCount > 0 && `(${notificationsCount})`}</h3>
        </NavLink>

        <div className="adminDash-shop">
          <h2>Shop</h2>
          <NavLink to="/post" >
            <IoCloudUploadOutline className="admin-shop-icon" /> <h3> Post</h3>
          </NavLink>
          <NavLink to='/orders'>
            <CiDeliveryTruck className="admin-shop-icon" /> <h3>Orders {ordersCount > 0 && `(${ordersCount})`}</h3>
          </NavLink>
          <NavLink to="/uploads">
            <IoMdCloudOutline className="admin-shop-icon" /> <h3>Uploads</h3>
          </NavLink>
        </div>

        <div className="adminDash-masterclass">
       

          <NavLink to='/adminlog'>
            <img
              src={user?.photoURL}
              alt="adminDisplayPicture"
              className=" admin-pic"
            />
            <p>{user?.displayName}</p>
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
              <NavLink to='/adminNotifications'>
                <IoIosNotificationsOutline className="admin-shop-icon" />
                <h3>Notifications</h3>
              </NavLink>
              {/* Your menu links with icons */}
              <NavLink to="/post">
                <IoCloudUploadOutline className="admin-shop-icon" />
                <h3>Post</h3>
              </NavLink>
              <NavLink to="/orders">
                <CiDeliveryTruck className="admin-shop-icon" /> <h3>Orders</h3>
              </NavLink>
              <NavLink to="/uploads">
                <IoMdCloudOutline className="admin-shop-icon" />
                <h3>Uploads</h3>
              </NavLink>

              <NavLink to='/adminlog'>
                <img
                  src={user?.photoURL}
                  alt=""
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
