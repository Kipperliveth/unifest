import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserNav from "../App-components/UserNav";

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
          <p>{greeting},</p> <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
