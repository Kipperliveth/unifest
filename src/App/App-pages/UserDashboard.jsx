import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserNav from "../App-components/UserNav";
import { MdOutlineShoppingBag, MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

function UserDashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  //time greeting
  const currentTime = new Date().getHours();
  let greeting;

  if (currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime < 16) {
    greeting = "Good afternoon";
  } else if (currentTime < 24) {
    greeting = "Good evening";
  } else {
    greeting = "Hello";
  }

  return (
    <div className="userDash">
      <UserNav />
      {/*  */}
      <div className="userDash-container">
        <div className="userDash-header">
          <h1>Dashboard</h1>
          <div className="userNameGreeting">
            <p>{greeting},</p> <p>{user?.email} {user.displayName} {user.address}</p>
          </div>
        </div>

        <div className="dash-links">
          <NavLink to="/store" className="link store">
            <MdOutlineShoppingBag className="dashLinks-icon" />
            <h1>Store</h1>
            <p>Shop for unique decor items to elevate your space at Store.</p>
          </NavLink>

          <NavLink to="/userMasterclass" className="link masterclass">
            <LiaChalkboardTeacherSolid className="dashLinks-icon" />
            <h1>Masterclass</h1>
            <p>
              Master the fundamentals of interior design and Develop the skills
              to design any space with confidence.
            </p>
          </NavLink>

          <NavLink to="/userProfile" className="link userProfile">
            <MdOutlineManageAccounts className="dashLinks-icon" />
            <h1>Account</h1>
            <p>
              Edit and update your profile and address.
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
