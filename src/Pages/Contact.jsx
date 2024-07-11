import React from "react";
import { useState, useEffect, useRef  } from "react";
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";
import NavCountdown from "../Components/NavCountdown";
import { BiChat } from "react-icons/bi";

import { useForm, ValidationError } from '@formspree/react';


function openTawkTo() {
  if (window.Tawk_API) {
    window.Tawk_API.toggle();
  }
}

function Contact() {
  const [completed, setCompleted] = useState(false)
  const [notCompleted, setNotCompleted] = useState(false)

  const [showPopup, setShowPopup] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);
  const [wasSubmitting, setWasSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact-Unifest";

    if (!hasMounted) {
      setHasMounted(true);
      AOS.init({
        delay: 200,
      });
    } else {
      AOS.refresh();
    }
  }, [hasMounted]);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const offset = element.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 1) + (element.clientHeight / 2);
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 100); // Adjust delay as needed
    }
  }, [hash]);

  const [state, handleSubmit] = useForm("xzzpzbpn");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
      setShowPopup(false);
      setCompleted(true);
    } else if (!state.submitting && wasSubmitting && !state.succeeded) {
      setShowPopup(false);
      setNotCompleted(true);
      console.log('didint work')
    }

    if (state.submitting) {
      setWasSubmitting(true);
    }
  }, [state.succeeded, state.submitting, wasSubmitting]);

  const handleFormSubmit = (event) => {
    setShowPopup(true);
    handleSubmit(event);
  };

  return (
    <div className="pagewidth">
      <div className="contact">
        <div className="contact-header">
        <div className="header">

          <h1>Contact Us</h1>
          <NavCountdown />
          </div>
        </div>

        <div className="contact-form">
          <div className="form-left">
            <h1
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
              data-aos-once="true"
            >
              Get in <span>Touch</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
          Have a question about the concert? We're happy to help! Send us a message using the form below, or stay updated on the latest news and announcements by following us on social media.
            </p>

            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-once="true"
            >
        <a href="mailto:unifest12@gmail.com?subject=Unifest%20'24%20Inquiry" className="contact-page-cta">
        <div>Send a Message</div>
        <AiOutlineForm className="cta-form" />
      </a>

            </div>
          </div>

          <div
            className="form-right"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="600"
            data-aos-once="true"
          >
            <form onSubmit={handleFormSubmit}>
              <div className="top">
                <input type="text" id="name" name="name" placeholder="Name" ref={nameRef} required />
                <input type="email" id="email" name="email" placeholder="yourmail@gmail.com" ref={emailRef} required />
              </div>
              <div className="bottom">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  ref={messageRef}
                  required
                ></textarea>
              </div>
              <button type="submit" disabled={state.submitting}>
                <h3>Submit</h3> <VscSend className="submit-btn" />
              </button>

              <div className="form-socials">
                      <a href="https://www.instagram.com/unifest001?igsh=Y3UzY3U3Ym44dmh6"><FaInstagram className="icon" /></a>
                      <a href="https://x.com/unifest001?t=v1LY_RCY5_DHDN7XBiMzqA&s=09"><FaXTwitter className="icon" /></a>
                      <a  href="mailto:unifest12@gmail.com?subject=Unifest%20'24%20Inquiry"><MdMailOutline className="icon" /></a>
                      <a href="https://www.tiktok.com/@unifest001?_t=8nv0OSN4tUL&_r=1"><IoLogoTiktok className="icon" /></a>
                    </div>
            </form>
          </div>
        </div>

        <section id="faqs" className="Faqs">
          <h1
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
            data-aos-once="true"
          >
            Frequently Asked Questions
          </h1>

          <div className="acc-wrap">
            <div className="accordion">
              <div className="left">
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="300"
                  data-aos-once="true"
                >
                  <input type="radio" id="one" name="item" />
                  <label htmlFor="one" className="title">
                    How can i purchase tickets?  
                  </label>
                  <div className="acc-content">
                  Tickets can be purchased online through our official website or at the venue on the day of the event. Get tickets now <NavLink>here</NavLink>
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="400"
                  data-aos-once="true"
                >
                  <input type="radio" id="five" name="item" />
                  <label htmlFor="five" className="title">
                   Where is the Unifest Venue located?
                  </label>
                  <div className="acc-content">
                 The venue for Unifest '24 is Olobo Premiere College, Opposite Uniport Main Gate. Get directions <NavLink>here</NavLink>                   </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="500"
                  data-aos-once="true"
                >
                  <input type="radio" id="three" name="item" />
                  <label htmlFor="three" className="title">
                   What is the Concert data and time?
                  </label>
                  <div className="acc-content">
                   Unifest will take place on the 14th of sepetember at 12:00 PM
                  </div>
                </div>
              </div>

              <div className="right">
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="600"
                  data-aos-once="true"
                >
                  <input type="radio" id="four" name="item" />
                  <label htmlFor="four" className="title">
                  Are there any age restrictions for the concert?
                  </label>
                  <div className="acc-content">
                  The concert is open to all ages, but children under 16 must be accompanied by an adult.
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="700"
                  data-aos-once="true"
                >
                  <input type="radio" id="six" name="item" />
                  <label htmlFor="six" className="title">
                  Will there be food and beverages available?
                  </label>
                  <div className="acc-content">
                  Yes, there will be a variety of food and beverage vendors at the venue.
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="800"
                  data-aos-once="true"
                >
                  <input type="radio" id="two" name="item" />
                  <label htmlFor="two" className="title">
                  Can I volunteer for the event?
                  </label>
                  <div className="acc-content">
                  Yes, we welcome volunteers. Please send us a message to get started.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="about-touch">
          <h1
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Have More Questions?
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="300"
            data-aos-once="true"
          >
            <NavLink to="#" onClick={openTawkTo} className="about-page-cta">
              <div>Chat with us</div>
              <BiChat className="cta-insta" />
            </NavLink>
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

          <div className="checkbox-wrapper">
          <input defaultChecked={false} type="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
                </div>

        <h1>all done!</h1>


        <p>Your message has been sent succesfully! <br /> We will get in touch soon.</p>

       <div className='buttons'>
            <button onClick={() => setCompleted(false)} className="a"> Close</button>
        </div>

          </div>
          </div>
      )}

      {notCompleted && (
        <div className='checkout-popup'>


          <div className='checkout-container'>

          <div className=" error">
         <h1>X</h1>
           </div>

        <h1>oops!</h1>


        <p>Something went wrong, your message didnt go through! <br /> Please try again.</p>

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

export default Contact;
