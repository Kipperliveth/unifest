import React, { useState, useEffect } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { ImSpinner8 } from "react-icons/im";
import { auth } from "../../firebase-config";
import {
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { useNavigate } from "react-router-dom";

function Adminlog() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const logout = async () => {
    setIsLoggedIn(true);

    if (auth.currentUser) {
      await signOut(auth);
      navigate("/login");
      setIsLoggedIn(false);

    } else {
      // Handle the scenario where the user is not logged in
      // For example, you might display an error message or redirect the user to the login page
      console.log("User is not logged in");
    //   navigate("/login");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);
  
  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content ">Admin Log</h2>

      <div className="adminHome-content adminContent adminlog">
      <h2 className="admin-current-page desktop-content"> Admin Log</h2>

        <div className="body">
            <p>You're logged in as admin</p>
            <button onClick={logout}>
          {isLoggedIn ? (
                  <ImSpinner8 className="login-spinner" />
                ) : (
                  "Log Out"
                )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adminlog;
