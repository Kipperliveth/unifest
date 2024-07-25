import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import aboutImage from "../stock/backgrounds/raygen.jpg";
import reverse from "../stock/backgrounds/reverse.jpg";
import angel from "../stock/backgrounds/angel.jpg";
import vend from "../stock/backgrounds/vend.jpg";
import vip from "../stock/backgrounds/vip.jpg";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";
// import NavCountdown from "../Components/NavCountdown";
import NavCountdown from "../Components/NavCountdown";
import { IoCameraOutline } from "react-icons/io5";

function About({ setShowPopup }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    document.title = "About-Unifest";

    if (!hasMounted) {
      setHasMounted(true);
      AOS.init({
        delay: 200,
      });
    } else {
      AOS.refresh();
    }
  }, [hasMounted]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'  // Optional: for smooth scrolling
    });
  };

  return (
    <div className="pagewidth">
      <div className="about">
        <div className="about-header">

          <div className="header">

          <h1>About UNIFEST </h1>

          <NavCountdown />
          </div>

        </div>

        <div className="about-story">
          <div className="abt-story-left">
            <h1
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
              About <span>UNIFEST</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-once="true"
            >
              Unifest is an annual university festival in Nigeria, bringing together students from various campuses to experience a vibrant blend of music, food, art, fun, style, and creativity.
            </p>

            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <NavLink to='/memories' className="about-page-cta">
                <div>Experience Unifest</div>
                <IoCameraOutline className="cta-insta" />
              </NavLink>
            </div>
          </div>

          <div
            className="abt-story-right"
          >
            <img 
             data-aos="fade-down"
             data-aos-duration="800"
             data-aos-delay="600"
             data-aos-once="true"
             src={aboutImage} alt="about-us" />
            <img
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
             src={angel} alt="about-us" />
          </div>
        </div>

        <div className="about-story cont">

          <div
            className="abt-story-right"
            data-aos="zoom-in-left"
            data-aos-duration="800"
            data-aos-delay="600"
            data-aos-once="true"
          >
            <div  className='left-right'>
            <img
            data-aos="zoom-in" 
            data-aos-duration="800"
            data-aos-delay="600"
            data-aos-once="true"
            src={vip} alt="about-us" />
          </div>
          <div  className='left-left'>
            <img 
             data-aos="zoom-in"
             data-aos-duration="800"
             data-aos-delay="200"
             data-aos-once="true"
             src={vend} alt="about-us" />
            <img  data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-once="true" src={reverse} alt="about-us" />
          </div>

          </div>

          <div className="abt-story-left">
            <h1
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
              Why UNIFEST is more than a <span>FESTIVAL</span>
            </h1>

            <p
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-once="true"
            >
             Unifest creates an electrifying atmosphere, offering a platform for emerging talents and serving as a hub for inspiration and connection. More than just an event, Unifest is a movement that fosters community and builds lifelong friendships.
            </p>

            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <a href='#next-step' className="about-page-ctaa">
                Become a part of this Year's Unifest
              </a>
            </div>

          </div>

        </div>

        <div className="about-values">
          <span className="values-header">
            <h1
            >
              Get Involved with UNIFEST <br /> <span >This Year</span>
            </h1>
           
          </span>

          <div className="shop-items">
            <a
             href="https://docs.google.com/forms/d/e/1FAIpQLSfVflDw-JyfDIA4ZcbTKriVqV945xzHbNIlPO6hV0x5NP4GIQ/viewform?usp=sf_link"
              className="clm one"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="200"
            >
              <h2 className="top-desc">Become a Perfomer</h2>

              <h3 className="bottom-desc">Fill the form here</h3>
            </a>

            <NavLink
              onClick={scrollToBottom}
              className="clm five"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="300"
            >
              <h2 className="top-desc">Follow Our Socials</h2>

              <h3 className="bottom-desc">Follow us for news and Updates</h3>
            </NavLink>

            <a
             href="#next-step"
              className="clm two"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="300"
            >
              <h2 className="top-desc">Become a Sponsor</h2>

              <h3 className="bottom-desc">Partner with us for Unifest '24</h3>
            </a>

            <NavLink
              className="clm three"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
              onClick={scrollToBottom}
            >
              <h2 className="top-desc">Join our team</h2>

              <h3 className="bottom-desc">Join the Media/Planning Team</h3>
            </NavLink>

            <NavLink
              to="/merch-preview"
              className="clm four"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="500"
            >
              <h2 className="top-desc">Buy the Merch</h2>

              <h3 className="bottom-desc">Buy the officail Unifest '24 merch</h3>
            </NavLink>
          </div>

        </div>

        <section id="next-step" className="next-step">
          <h1
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="400"
            data-aos-once="true"
          >
            Be part of the UNIFEST <span>Experience</span>
          </h1>
       
          <div
            className="next-links"
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="600"
            data-aos-once="true"
          >
            <NavLink >Get Tickets</NavLink>
            <NavLink to='/contact'>Contact Us</NavLink>
          </div>
        </section>

      </div>
    </div>
  );
}

export default About;
