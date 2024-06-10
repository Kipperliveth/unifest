import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserNav from "../App-components/UserNav";

function MasterclassMain() {

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  return (
    <div>
      <UserNav />

      <div className="masterclass-app">
      <div className="body">

    <div class="content">

      <h1>Coming Soon</h1>
      <p>Our Interior Design Masterclass is coming soon! For questions, send us a message or follow us on social media for updates.</p>
    
    </div>

      </div>
     
      </div>
    </div>
  );
}

export default MasterclassMain;
