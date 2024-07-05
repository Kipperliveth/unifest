import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";
import CountdownTimer from "../Components/CountdownTimer";

function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    document.ttile = "Evanis Interiors"
    
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
    <div className="pagewidth ">
      <div className="home">
        <div className="landing">
          <div
            className="landing-content-container"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h1 data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
              The Biggest Party on Campus Returns!
            </h1>
            <p
              data-aos-delay="300"
              data-aos="fade-up" data-aos-duration="800" data-aos-once="true" 
             >
              The VYBEZ Universe will be live in
             
            </p>
          <CountdownTimer />


            <div
              className="button"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <button className="cta">
                <NavLink to='/login' className='span'>Become a perfomer</NavLink>
              </button>
            </div>
          </div>
        </div>

       

        <div className="masterclass-section">

          <div className="m-container">
            <div
              className="m-sec-left"
              // data-aos="zoom-in-right"
              // data-aos-duration="500"
              // data-aos-once="true"
            >
              <div className="left-box one"></div>
              <div className="left-box two"></div>
              <div className="left-box three"></div>
            </div>

            <div className="m-sec-right">
              <h3
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                Welcome to UNIFEST
              </h3>

              <h1
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                data-aos-once="true"
              >
               
                The <span>Ultimate </span> university concert festival celebrating the vibrant spirit of our campus community
              </h1>

              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay="300"
              >
              Unifest is more than just a festival; it’s a celebration of music, creativity, and the unique culture that makes our university special.
              </p>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay="400"
              >
                <NavLink to="/masterclass" className="masterclass-cta">
                  <p>Read more</p>
                  <FaArrowRightLong />
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <div className="abt-sec-container">
            <div className="abt-sec-left">
              <h3
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                data-aos-once="true"
              >
                2023
              </h3>

              <h1
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <span>Last year,</span> Unifest brought an amazing Vybe and an unforgettable experience.

              </h1>

              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
                data-aos-once="true"
              >
      We rocked the campus with performances from Nigeria’s A-list artists and our very own campus talents.
              </p>

              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
                data-aos-once="true"
              >
                <NavLink to="/about">See UNIFEST 2023 in Pictures</NavLink>
              </div>
            </div>

            <div
              className="abt-sec-right"
              data-aos="zoom-in-left"
              data-aos-duration="800"
              data-aos-delay="200"
              data-aos-once="true"
            >
            </div>
          </div>
        </div>

        <div className="this-year-section">

          <div className="this-year-container">

            <div className="left">
              <div className="top">

              </div>
              <div className="bottom">
                    <h4>This Year: Bigger, Better, and Unmissable </h4>
                    <h2>We're back this year, bigger and better than ever! </h2>
              </div>
            </div>

                <div className="right">
                  <div className="block one">
                  <div className="img"></div>
                  <div className="span">
                    <h3>With a new venue</h3>
                    <p></p>
                    </div></div>

                  <div className="block two"><div className="img imgtwo"></div><div className="span"><h3>Fresh performances from amazing new talents</h3></div></div>

                  <div className="block three"><div className="img imgthree"></div><div className="span"><h3> Unifest 2024 is set to be the ultimate place to create, Vybe and connect.</h3></div></div>
                </div>
          </div>

        </div>

        <div className="landing tickets">
          <div
            className="landing-content-container"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h1 data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
            Be a part of this year's unforgettable moments.
            </h1>
            <p
              data-aos-delay="300"
              data-aos="fade-up" data-aos-duration="800" data-aos-once="true" 
             >
              Click below to secure your spot and get your tickets now!
            </p>


            <div
              className="button"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <button className="cta">
                <NavLink to='/login' className='span'>Get Tickets</NavLink>
              </button>
            </div>
          </div>
        </div>

        <div className="shop-section">
          <h1 data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
            Identify with the VYBEZ!
          </h1>

          <p data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
          Get your exclusive Unifest merch and join the coolest crowd on campus!
          </p>

          <h5 data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay='300'>Don't just attend the event—live the experience.</h5>

          <div className="shop-items">
            <NavLink
              to="/merch"
              className="clm one"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="200"
            >
              <h2 className="top-desc">T-Shirts & Hoodies</h2>

              <h3 className="bottom-desc">Shirts, vests, Hoodies and Cropped Hoodies</h3>
            </NavLink>

            <NavLink
              to="/store"
              className="clm five"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="300"
            >
              <h2 className="top-desc">Trousers & Shorts</h2>

              <h3 className="bottom-desc">Joggers and shorts</h3>
            </NavLink>

            <NavLink
              to="/store"
              className="clm two"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="300"
            >
              <h2 className="top-desc">Hats & Caps</h2>

              <h3 className="bottom-desc">Snapback caps and beanies</h3>
            </NavLink>

            <NavLink
              to="/store"
              className="clm three"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <h2 className="top-desc">Footwear</h2>

              <h3 className="bottom-desc">Slides, Socks and Crocs</h3>
            </NavLink>

            <NavLink
              to="/store"
              className="clm four"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="500"
            >
              <h2 className="top-desc">Luggage & Bags</h2>

              <h3 className="bottom-desc">Backpacks</h3>
            </NavLink>
          </div>

          <button
            className="shop-cta"
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <NavLink className='span'>Get the Merch</NavLink>
            <FaArrowRightLong className="ctaArrow special-icon" />
          </button>
        </div>

        <div className="sponsors-section"></div>

        <div className="newsletter-section">
          <div className="newsletter-container">
            <h3
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>Stay</span> in the loop!
            </h3>

            <h1
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              Subscribe to our newsletter for the <span>latest updates</span> and News from <span>UNIFEST.</span>
            </h1>
            <span></span>

            <p
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
            Join vybez universe and get access to exclusive offers, early bird tickets, festival updates, insider tips, and the latest news about UNIFEST straight from our team.
            </p>

            <div
              className="sub-container"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <input type="text" placeholder="Enter email address" />
              <button>Subscribe</button>
            </div>

            <h6
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              We promise not to spam you
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
