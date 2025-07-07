import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";
import CountdownTimer from "../Components/CountdownTimer";
import NavCountdown from "../Components/NavCountdown"
import tesh from '../stock/backgrounds/tesh.png'
import mavin from '../stock/backgrounds/mavin.png'
import tekkon from '../stock/backgrounds/tekkon.png'
import toscana from '../stock/backgrounds/hotel.png'
import audiomack from '../stock/backgrounds/audio.png'
import clip from '../stock/backgrounds/6-removebg.png'
import { txtdb } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { LuMailX } from "react-icons/lu";
import { LuMailCheck } from "react-icons/lu";
import { BsCalendar2Month } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

function Home() {
  
  const [hasMounted, setHasMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [completed, setCompleted] = useState(false)
  const [notCompleted, setNotCompleted] = useState(false)
  const [applicationClosed, setApplicationClosed] = useState(false)
  
  useEffect(() => {
    document.title = "UNIFEST - The Biggest Party On campus"
    
    if (!hasMounted) {
      setHasMounted(true);
      AOS.init({
        delay: 200,
      });
    } else {
      AOS.refresh();
    }
  }, [hasMounted]);

  //newsletters
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPopup(true);
    setStatus('Submitting...');
    
    try {
      // Add the email to the Firestore database
      await addDoc(collection(txtdb, 'subscribers'), { email });
      setStatus('Subscription successful!');
      console.log('Subscription successful!');
      setEmail('');
      setShowPopup(false);
      setCompleted(true);

    } catch (error) {
      console.error('Error adding email:', error);
      setStatus('Subscription failed. Please try again.');
      setShowPopup(false);
      setNotCompleted(true);
    }
  };



  return (
    <div className="pagewidth ">
      <div className="home">
        <div className="landing">
          
          <div
            className="landing-content-container"
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h1 data-aos="zoom-in" data-aos-duration="800" data-aos-once="true">
              The Biggest Party on Campus!
            </h1>
            <p
              data-aos-delay="300"
              data-aos="zoom-in" data-aos-duration="800" data-aos-once="true" 
             >
              Brought to you by BIG VYBEZ NETWORK
             
            </p>
          {/* <CountdownTimer /> */}
          <NavCountdown />


            <div
              className="button"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <button className="cta">
                <NavLink to='/memories' className='sspan'>Experience UNIFEST</NavLink>
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
              <div 
              data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true" className="left-box one"></div>
              <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
               className="left-box two"></div>
              <div 
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-once="true"
              className="left-box three"></div>
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
               
              It’s more than a <span> concert</span> — it’s the one day everything comes alive.
              </h1>

              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay="300"
              >
            Unifest is where the music hits different, the crowd feels like family, and the memories stick long after the lights go out. It’s the heartbeat of campus life.
              </p>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay="400"
              >
                <NavLink to="/about" className="masterclass-cta desktop">
                  Read more
                </NavLink>
              </div>
            </div>
          </div>

          <NavLink to="/about" className="masterclass-cta mobile" >
                  Read more
          </NavLink>
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
           We Did It in 2023. We Took It Further in 2024.
              </h3>

              <h1
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
                data-aos-once="true"
              >
              From <span>unforgettable</span> campus memories to show-stopping performances
              </h1>

              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
                data-aos-once="true"
              >
            Unifest has been the heartbeat of student life two years in a row.

            We brought the Vybe. Nigeria’s biggest artists shared the stage with homegrown campus stars and together, we made magic.

            And guess what? We’re just getting started.
              </p>

              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
                data-aos-once="true"
              >
                <NavLink to="/memories" className="desktop">See UNIFEST in Pictures</NavLink>
              </div>
            </div>

            <div
              className="abt-sec-right"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="200"
              data-aos-once="true"
            >
            </div>
          </div>
          <NavLink to="/memories" className="mobile">See UNIFEST in Pictures</NavLink>

        </div>

        {/* <div className="this-year-section">

          <div className="this-year-container">

            <div className="left">
              <div className="top">
              <img src={clip} alt="unifest" />
              </div>
              <div className="bottom">
                    <h4>This Year: Bigger, Better, and Unmissable </h4>
                    <h2>We're back this year, bigger and better than ever! </h2>
              </div>
            </div>

                <div className="right">
                  <div className="block one">
                  <div className="img"></div>
                  <div className="this-year-span">
                    <h3>With a new venue</h3>
                    <p>UNIFEST will be live at Olobo premier college on September 14th 2024, opposite the University of Port Harcourt main gate.</p>
                    <a href="https://maps.app.goo.gl/MwLTcvd8WWjFZsPB8">Get directions</a>
                    </div></div>

                  <div className="block two">
                    <div className="img imgtwo"></div>
                    <div className="this-year-span">
                      <h3>Fresh performances from amazing new talents</h3>
                      <p>Witness & Be Part Of The Vybe! Experience incredible performances and get your chance to showcase too!</p>
                    <NavLink onClick={() => setApplicationClosed(true)}>Become a performer</NavLink>
                        </div></div>

                  <div className="block three">
                    <div className="img imgthree"></div>
                    <div className="this-year-span">
                      <h3> Be Part of Unifest 2024!</h3>
                      <p>This year, Unifest is bringing the heat with acts that will blow the roof off! Surprise artists, rising stars, and local legends are all set to create a once-in-a-lifetime Vybe with you and your crew.</p>
                    <NavLink to='/tickets'>Buy Your Tickets Now</NavLink>

                      </div></div>
                </div>
          </div>

        </div> */}

        <div className="info">

          <div className="info-container">

          <div className="head-text">
            <h3>Every year's bigger and better than the last. <br /> <span style={{ color: "#FF7E00" }}>2025,</span> Get ready to Vybe with No Limits</h3>

            <div className="datenvenue">
            <p><BsCalendar2Month />2ND August 2025</p>
            <p><IoLocationOutline />Old Convocation Arena</p>
            </div>
          </div>

          <div className="pixels">

              <div className="left">

                <div className="longer-left">
                  <div className="longer-left-img"></div>
                </div>

                <div className="shorter-right">
                <div className="shorter-right-img1"></div>
                <div className="shorter-right-img2"></div>
                </div>

              </div>


              <div className="right">
                <div className="shorter-left">
                 <div className="shorter-left-img"></div>
                </div>
                  <div className="longer-right">
                 <div className="longer-right-img1"></div>
                 <div className="longer-right-img2"></div>
                </div>
              </div>
              
          </div>

          </div>

        </div>

        <div className="landing tickets">
          <div
            className="landing-content-container"
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h1 data-aos="zoom-in" data-aos-duration="800" data-aos-once="true">
           This year's about to be a movie, don't miss your scene.
            </h1>
            <p
              data-aos-delay="300"
              data-aos="zoom-in" data-aos-duration="800" data-aos-once="true" 
             >
             Grab your tickets now!
            </p>


            <div
              className="button"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <button className="cta">
                <NavLink to='/tickets' className='tickets-span'>Get Tickets</NavLink>
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
              to="/merch-preview"
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
              to="/merch-preview"
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
              to="/merch-preview"
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
              to="/merch-preview"
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
              to="/merch-preview"
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
            <NavLink to='/merch-preview' className='shop-span'>Get the Merch</NavLink>
          </button>
        </div>

        <div className="sponsors-section">
          <h1 className="sponsors-title">Meet our Sponsors</h1>

         <div className="sponsors-scroll-wrapper">
        <div className="sponsors-container">
          <img src={toscana} alt="toscana hotel" />
          <img src={mavin} alt="mavin records" />
          <img src={audiomack} alt="audiomack" />
          <img src={tekkon} alt="tekkon" />
          <img src={tesh} alt="tesh interiors" />

          {/* Duplicate for seamless loop */}
          <img src={toscana} alt="toscana hotel" />
          <img src={mavin} alt="mavin records" />
          <img src={audiomack} alt="audiomack" />
          <img src={tekkon} alt="tekkon" />
          <img src={tesh} alt="tesh interiors" />
        </div>
      </div>

      <p>Join the only student-powered festival that actually gets it.</p>

          <NavLink to='/contact'>Become a sponsor</NavLink>
        </div>

        <div className="newsletter-section">
          <div className="newsletter-container">
            <h3
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>Stay</span> in the loop!
            </h3>

            <h1
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              Subscribe to our newsletter for the <span>latest updates</span> and News from <span>UNIFEST.</span>
            </h1>
            <span></span>

            <p
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
            Updates on exclusive offers, early bird tickets, insider tips, and the latest news about UNIFEST straight from our team.
            </p>

            <div
              className="sub-container"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
               />
              <button>Subscribe</button>
              </form>
            </div>

            <h6
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-once="true"
            >
              We promise not to spam you
            </h6>
          </div>
        </div>

        {showPopup && (
        <div className="popup">

          <div className="spinner">
            <div></div>   
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
          </div>


        </div>
      )}

      {completed && (
        <div className='checkout-popup'>


          <div className='checkout-container'>

          <div className="success">
        <LuMailCheck className="ticket-icon"/>
        </div>

        <h1>all done!</h1>

        <p>Your are now subscribed to the UNIFEST Newsletter!<br /> Updates and news will be sent to your email.</p>

       <div className='buttons'>
            <button onClick={() => setCompleted(false)} className="a"> Close</button>
        </div>

          </div>
          </div>
      )}

      {notCompleted && (
        <div className='checkout-popup'>


          <div className='checkout-container'>

          <div className="error">
        <LuMailX className="ticket-icon"/>
        </div>

        <h1>oops!</h1>


        <p>Something went wrong, you are not yet subscribed! <br /> Please try again.</p>

       <div className='buttons'>
            <button onClick={() => setNotCompleted(false)} className="a again"> try again</button>
        </div>

          </div>
          </div>
      )}

{applicationClosed && (
        <div className='addNumber'>


          <div className='checkout-container'>

        <p>performance applications are currently closed</p>

       <div className='buttons'>
            <button onClick={() => setApplicationClosed(false)} className="a">close</button>
            <NavLink onClick={() => setApplicationClosed(false)} to='/tickets' className="a again">Get a ticket</NavLink>
        </div>

          </div>
          </div>
      )}  


      </div>
    </div>
  );
}

export default Home;
