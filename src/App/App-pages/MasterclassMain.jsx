import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { txtdb } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { LuMailX } from "react-icons/lu";
import { LuMailCheck } from "react-icons/lu";
import { motion } from "framer-motion";


function MasterclassMain() {

  const [showPopup, setShowPopup] = useState(false);
  const [completed, setCompleted] = useState(false)
  const [notCompleted, setNotCompleted] = useState(false)

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between child elements
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };
  


  return (
    <div>

      <div className="masterclass-app">
      <div className="body">

      <motion.div
  className="content"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.h1 variants={itemVariants}>Join the Challenge 🎯</motion.h1>
  <motion.p className="subtext" variants={itemVariants}>
    Subscribe today for your shot at exclusive freebies and VIP experiences, courtesy of our amazing brand partners!
  </motion.p>

  <motion.div className="sub-container" variants={itemVariants}>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button>Subscribe</button>
    </form>
  </motion.div>

  <motion.div className="form-socials" variants={itemVariants}>
    <a href="https://www.instagram.com/unifest001?igsh=Y3UzY3U3Ym44dmh6"><FaInstagram className="icon" /></a>
    <a href="https://x.com/unifest001?t=v1LY_RCY5_DHDN7XBiMzqA&s=09"><FaXTwitter className="icon" /></a>
    <a href="mailto:unifest12@gmail.com?subject=Unifest%20'24%20Inquiry"><MdMailOutline className="icon" /></a>
    <a href="https://www.tiktok.com/@unifest001?_t=8nv0OSN4tUL&_r=1"><IoLogoTiktok className="icon" /></a>
  </motion.div>

  <motion.p className="small-text" variants={itemVariants}>
    Spots are limited—don’t miss out!
  </motion.p>
</motion.div>


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

export default MasterclassMain;
