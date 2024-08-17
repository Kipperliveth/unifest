import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";
import NavCountdown from "../Components/NavCountdown";
import { IoTicketOutline } from "react-icons/io5";


function Masterclass() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    document.title = "Memories-Unifest";

    if (!hasMounted) {
      setHasMounted(true);
      AOS.init({
        delay: 200,
      });
    } else {
      AOS.refresh();
    }
  }, [hasMounted]);

  return (
    <div className="pagewidth">
      <div className="masterclass">
        {/*  */}
        <div className="masterclass-landing">
          <div className="header">

          <h1>UNIFEST Rewind</h1>
          <NavCountdown />

          </div>
        </div>

        <div className="masterclass-enroll">

          <div className="enroll-left">

          <h3 
           data-aos="zoom-in"
           data-aos-duration="1000"
           data-aos-once="true"
          >Highlights from UNIFEST <span>2023</span> </h3>
            <h1
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-once="true"
            >
             UNIFEST is set to be most dynamic <span>Student Festival</span> in Nigeria
            </h1>
            <p
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="400"
              data-aos-once="true"
            >
             Connecting Universities and creating the best memories.
            </p>

        
          </div>

            <div className="enroll-right">

              <div className="pic-left">
              <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  data-aos-once="true"
               className="pic wide one"></div>
              <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="300"
                  data-aos-once="true"
               className="pic long two"></div>
              </div>

              <div className="pic-right">
              <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="400"
                  data-aos-once="true"
              className="pic long three"></div>
              <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                  data-aos-once="true"
              className="pic wide four"></div>
              </div>
            </div>
        
        </div>

        <div className="activities">
              <div className="activities-left">
                <div 
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-once="true" className="box"></div>
                <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  data-aos-once="true"
                className="box"></div>
                <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="400"
                  data-aos-once="true"
                className="box"></div>
              </div>

              <div className="activities-right">
                <h1 
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-once="true"
                >UNIFEST 2023 was an <span>Unforgettable</span> Experience.</h1>
                <p
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  data-aos-once="true"
                >The energy was electric, the atmosphere buzzing with excitement. From electrifying performances to vibrant social gatherings, there was something for everyone. </p>

                <div className="more-pics">
                  <div
                   data-aos="zoom-in"
                   data-aos-duration="1000"
                   data-aos-once="true"
                  className="pic"></div>
                  <div 
                   data-aos="zoom-in"
                   data-aos-duration="1000"
                   data-aos-delay="200"
                   data-aos-once="true"
                  className="pic"></div>
                  <div
                   data-aos="zoom-in"
                   data-aos-duration="1000"
                   data-aos-delay="400"
                   data-aos-once="true"
                  className="pic"></div>
                </div>
              </div>
        </div>

        <div className="stage">

        </div>

        <div className="thepeople">
              {/* <h1>Unifest is an exciting way to meet new people and make valuable campus connections.</h1> */}
        </div>

        <div className="see-more">
          <h2>See More <span>Pictures</span> and Momements from <br /> UNIFEST 2023</h2>
      
          <div className="see-more-container">
          <div className="left">
            <div className="left-top"></div>
            <div className="left-bottom"></div>
          </div>
          <div className="middle">
            <div className="middle-only"></div>
          </div>
          <div className="right">
            <div className="right-top">
              <div className="right-top-1"></div>
              <div className="right-top-2"></div>
            </div>
            <div className="right-bottom">
              <div className="right-bottom-only"></div>
            </div>
          </div>
          </div>

        </div>

        <div className="about-touch">
          <h1
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Get Tickets Now
          </h1>

          <div
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="300"
            data-aos-once="true"
          >
            <NavLink to='/tickets' className="about-page-cta">
              <div>UNIFEST 2024 Tickets</div>
              <IoTicketOutline className="cta-insta" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Masterclass;
