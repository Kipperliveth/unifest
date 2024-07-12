import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";
import CountdownTimer from "../Components/CountdownTimer";
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


function Home() {
  
  const [hasMounted, setHasMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [completed, setCompleted] = useState(false)
  const [notCompleted, setNotCompleted] = useState(false)
  
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
              The Biggest Party on Campus Returns!
            </h1>
            <p
              data-aos-delay="300"
              data-aos="zoom-in" data-aos-duration="800" data-aos-once="true" 
             >
              The VYBEZ Universe will be live in
             
            </p>
          <CountdownTimer />


            <div
              className="button"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <button className="cta">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVflDw-JyfDIA4ZcbTKriVqV945xzHbNIlPO6hV0x5NP4GIQ/viewform?usp=sf_link" to='/login' className='sspan'>Become a perfomer</a>
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
                <NavLink to="/about" className="masterclass-cta">
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
                <NavLink to="/memories">See UNIFEST 2023 in Pictures</NavLink>
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
        </div>

        <div className="this-year-section">

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
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVflDw-JyfDIA4ZcbTKriVqV945xzHbNIlPO6hV0x5NP4GIQ/viewform?usp=sf_link">Become a performer</a>
                        </div></div>

                  <div className="block three">
                    <div className="img imgthree"></div>
                    <div className="this-year-span">
                      <h3> Be Part of Unifest 2024!</h3>
                      <p>This year, Unifest is bringing the heat with acts that will blow the roof off! Surprise artists, rising stars, and local legends are all set to create a once-in-a-lifetime Vybe with you and your crew.</p>
                    <a href="https://tellerafricatickets.com/product/unifest-2024/">Buy Your Tickets Now</a>

                      </div></div>
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
            Be a part of this year's unforgettable moments.
            </h1>
            <p
              data-aos-delay="300"
              data-aos="zoom-in" data-aos-duration="800" data-aos-once="true" 
             >
              Click below to secure your spot and get your tickets now!
            </p>


            <div
              className="button"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="400"
            >
              <button className="cta">
                <a href="https://tellerafricatickets.com/product/unifest-2024/" className='tickets-span'>Get Tickets</a>
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
              to="/comingsoon"
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
              to="/comingsoon"
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
              to="/comingsoon"
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
              to="/comingsoon"
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
              to="/comingsoon"
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
            <NavLink className='shop-span'>Get the Merch</NavLink>
            <FaArrowRightLong className="ctaArrow special-icon" />
          </button>
        </div>

        <div className="sponsors-section">
          <h1 className="sponsors-title">Meet our Sponsors from Last Year</h1>
          <div className="sponsors-container">
            <img src={toscana} alt="toscana hotel"/>
            <img src={mavin} alt="mavin records"/>
            <img src={audiomack} alt="audiomack"/>
            <img src={tekkon} alt="tekkon"/>
            <img src={tesh} alt="tesh interiors"/>
          </div>
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


      </div>
    </div>
  );
}

export default Home;
