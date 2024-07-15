import React from 'react'
import { IoTicketOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";


function Presale({ showPopup, setShowPopup }) {

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'  // Optional: for smooth scrolling
    });
    setShowPopup(false)
  };

  if (!showPopup) return null;

  return (
    <div >
        <div className="presale">
        
        <div className='checkout-popup'>


        <div className='checkout-container'>

        <div className=" error">
        <IoTicketOutline className="ticket-icon"/>
        </div>

        <h1>Pre-sale Tickets are Sold-Out!</h1>


        <p>Thank you for Buying the Pre-sale Tickets for UNIFEST 2024! <br />
        Follow our socials for more updates on the event </p>

        <div className='buttons'>
        <NavLink onClick={scrollToBottom}  className="a again"> Follow Us</NavLink>
        <button onClick={() => setShowPopup(false)} className="a close"> Close</button>
        </div>

        </div>
        </div>

    </div>
    </div>
  )
}

export default Presale