import React, {useState} from 'react'
import NavCountdown from '../../Components/NavCountdown';
import { IoTicketOutline } from "react-icons/io5";


function Tickets() {

    const [selectedPackage, setSelectedPackage] = useState("");
    const [regulardetails, setRegularDetails] = useState(false)
    const [vipdetails, setVipdetails] = useState(true)
    const [vvipdetails, setVvipdetails] = useState("")

    const handlePackageClick = (value) => {
      setSelectedPackage(value);

      if(value === "Regular"){
        setRegularDetails(true);
      } else if (value === "Vip"){
        console.log("Vip working")
        setVipdetails(true);
      } else if (value === "VVIP"){
        console.log("Vvip working")
        setVvipdetails(true);

      }
      console.log(value)
    };


  return (
    <div className="pagewidth">
    <div className="contact">
      <div className="contact-header tickets">
      <div className="header">

        <h1>Tickets</h1>
        <NavCountdown />
        </div>
      </div>

      <div className="ticket-form">

        <div
          className="form-right"
        >
            <div className="head">
            <h2>Buy Tickets <IoTicketOutline className="ticket-icon"/></h2>
            <p>Please Select the type of ticket you wish to purchase</p>
            </div>

            <div className="package-container">
            <div
                className={`package ${selectedPackage === 'Regular' ? 'selected' : ''}`}
                onClick={() => handlePackageClick('Regular')}
            >
               Regular
            </div>
            <div
                className={`package ${selectedPackage === 'Vip' ? 'selected' : ''}`}
                onClick={() => handlePackageClick('Vip')}
            >
               VIP
            </div>
            <div
                className={`package ${selectedPackage === 'VVIP' ? 'selected' : ''}`}
                onClick={() => handlePackageClick('VVIP')}
            >
                VVIP
            </div>
    </div>
            
          <form onSubmit={""}>

            <div className="top">
              <input type="text" id="firstName" name="firstName" placeholder="First Name"  required />
              <input type="text" id="lastName" name="lastName" placeholder="Last Name"  required />
            </div>


            <div className="bottom">
              <input type="email" id="email" name="email" placeholder="Email Address"  required />

              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />

              <label for="gender">Gender</label>
             <select id="gender" name="gender">
              <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>


              {/* <select>
              <option value="">Select Gender</option>
              <option value="Shirts">Male</option>
              <option value="Vests">Female</option>
            </select> */}

            </div>

            <button type="submit" disabled={""}>
              <h3>Checkout</h3> 
            </button>

            
          </form>


        </div>

      </div>

      {regulardetails && (
      <div className='checkout-popup'>


        <div className='checkout-container tickets'>

      <h1>Regular Tickets -   &#8358;5,000 (Early Bird)</h1>

        <ul>
        <li>Access To The Festival</li>
          <li>Access To Vendors At the Festival Venue</li>
          <li>Participation in festival games and activities</li>
          <li>You May Leave And Re-Enter The Festival At Any Time</li>
          <li>Opportunity to win prizes through festival contests and raffles</li>
        </ul>

     <div className='buttons tickets'>
          <button onClick={() => setRegularDetails(false)} className="a"> Close</button>
      </div>

        </div>
        </div>
    )}

       {vvipdetails && (
        <div className='checkout-popup'>
  
  
          <div className='checkout-container tickets'>
  
          <h1>VVIP Tickets -   &#8358;200,000 (5 Persons)</h1>
  
        
          <ul>
            <li>Access To The Festival</li>
            <li>Access To Vendors At the Festival Venue</li>
            <li>You May Leave And Re-Enter The Festival At Any Time</li>
          </ul>
        
  
       <div className='buttons tickets'>
            <button onClick={() => setVvipdetails(false)} className="a"> Close</button>
        </div>
  
          </div>
          </div>
      )}

    {vipdetails && (  
      <div className='checkout-popup'>


        <div className='checkout-container tickets'>

      <h1>VIP Tickets -   &#8358;90,000 (2 Persons)</h1>
      
        <ul>
          <li>Access To The Festival</li>
          <li>Access To Vendors At the Festival Venue</li>
          <li>Participation in festival games and activities</li>
          <li>You May Leave And Re-Enter The Festival At Any Time</li>
          <li>Opportunity to win prizes through festival contests and raffles</li>
        </ul>

     <div className='buttons tickets'>
          <button onClick={() => setVipdetails(false)} className="a"> Close</button>
      </div>

        </div>
        </div>
    )}

     {/* 

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
      */}


    </div>
  </div>
  )
}

export default Tickets