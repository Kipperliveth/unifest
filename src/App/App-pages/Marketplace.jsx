import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserNav from "../App-components/UserNav";

function Marketplace() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
      navigate('/login')
  };

  return (
    <div className="marketplace">
      <div className="market-container">
        <UserNav />
        <h1>Marketplace</h1>
        <h2>{user?.email}</h2>
        <button onClick={logout}>log out</button>
      </div>
    </div>
  );
}

export default Marketplace;
