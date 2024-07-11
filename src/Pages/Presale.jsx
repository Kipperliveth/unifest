import React from 'react'
import { IoTicketOutline } from "react-icons/io5";


function Presale({ showPopup, setShowPopup }) {

  if (!showPopup) return null;

  return (
    <div >
        <div className="presale">
        
        <div className='checkout-popup'>


        <div className='checkout-container'>

        <div className=" error">
        <IoTicketOutline className="ticket-icon"/>
        </div>

        <h1>Pre-sale Tickets are Live at 50% Off!</h1>


        <p>
        Pre-sale tickets for UNIFEST 2024 are now available <br /> for 72 hours get tickets at a 50% discount!</p>

        <div className='buttons'>
        <a href='https://tellerafricatickets.com/product/unifest-2024/'  className="a again"> Get Tickets</a>
        <button onClick={() => setShowPopup(false)} className="a close"> Close</button>
        </div>

        </div>
        </div>

    </div>
    </div>
  )
}

export default Presale