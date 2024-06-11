import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserNav from "../App-components/UserNav";
import { VscSend } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

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

    <div className="content">

      <h1>Coming Soon</h1>
      <p>Our Interior Design Masterclass is coming soon! For questions, send us a message or follow us on social media for updates.</p>
      <div className="form-socials">
                <FaInstagram className="icon" />
                <FaXTwitter className="icon" />
                <FaWhatsapp className="icon" />
                <MdMailOutline className="icon" />
              </div>
    </div>

      </div>
     
      </div>
    </div>
  );
}

export default MasterclassMain;
