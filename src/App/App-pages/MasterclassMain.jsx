import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";

function MasterclassMain() {


  return (
    <div>

      <div className="masterclass-app">
      <div className="body">

          <div className="content">

            <h1>Coming Soon</h1>
            <p>Get Notified When the merch Store Launches.</p>

            <div
              className="sub-container"
            >
              <input type="text" placeholder="Enter email address" />
              <button>Subscribe</button>
            </div>


            <div className="form-socials">
                      <a href="https://www.instagram.com/unifest001?igsh=Y3UzY3U3Ym44dmh6"><FaInstagram className="icon" /></a>
                      <a href="https://x.com/unifest001?t=v1LY_RCY5_DHDN7XBiMzqA&s=09"><FaXTwitter className="icon" /></a>
                      <a  href="mailto:unifest12@gmail.com?subject=Unifest%20'24%20Inquiry"><MdMailOutline className="icon" /></a>
                      <a href="https://www.tiktok.com/@unifest001?_t=8nv0OSN4tUL&_r=1"><IoLogoTiktok className="icon" /></a>
                    </div>
          </div>

      </div>
     
      </div>
    </div>
  );
}

export default MasterclassMain;
