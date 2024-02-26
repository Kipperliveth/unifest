import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserNav from "../App-components/UserNav";

function Marketplace() {
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

  return (
    <div className="marketplace">
      <UserNav />
      <div className="market-container">
        <h1>Marketplace</h1>
        <h2>{user?.email}</h2>
        <button onClick={logout}>log out</button>
      </div>
    </div>
  );
}

export default Marketplace;
