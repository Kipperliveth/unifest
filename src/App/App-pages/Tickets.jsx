import React, {useState} from 'react'
import NavCountdown from '../../Components/NavCountdown';

function Tickets() {
    const [selectedPackage, setSelectedPackage] = useState("");

    const handlePackageClick = (value) => {
      setSelectedPackage(value);
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
            <h2>Buy Tickets</h2>
            <p>Please Select the type of ticket you wish to purchase</p>
            </div>

            <div className="package-container">
            <div
                className={`package ${selectedPackage === '1' ? 'selected' : ''}`}
                onClick={() => handlePackageClick('1')}
            >
                1
            </div>
            <div
                className={`package ${selectedPackage === '2' ? 'selected' : ''}`}
                onClick={() => handlePackageClick('2')}
            >
                2
            </div>
            <div
                className={`package ${selectedPackage === '3' ? 'selected' : ''}`}
                onClick={() => handlePackageClick('3')}
            >
                3
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
    )} */}

    </div>
  </div>
  )
}

export default Tickets