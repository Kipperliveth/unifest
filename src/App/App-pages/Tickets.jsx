import React, {useEffect, useState} from 'react'
import NavCountdown from '../../Components/NavCountdown';
import { IoTicketOutline } from "react-icons/io5";
import {collection, addDoc, updateDoc} from "firebase/firestore";
import { txtdb } from '../../firebase-config';
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';



function Tickets() {
  const [copyButtonText, setCopyButtonText] = useState("Copy Ticket ID");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [regulardetails, setRegularDetails] = useState(false)
    const [vipdetails, setVipdetails] = useState(false)
    const [vvipdetails, setVvipdetails] = useState(false)


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [gender, setGender] = useState("")

    //subs
    const handleSubs = async (event) => {
      
      try {
        // Add the email to the Firestore database
        await addDoc(collection(txtdb, 'subscribers'), { email });
        console.log('Subscription successful!');
      } catch (error) {
        console.error('Error adding email:', error);
      }
    };

    // pop up spinner
  const [showPopup, setShowPopup] = useState(false);
  const [ticketId, setTicketId] = useState("")

const [completed, setCompleted] = useState(false)
const navigate = useNavigate();

    const [quantities, setQuantities] = useState({
      Regular: 1,
      Vip: 1,
      VVIP: 1,
    });

    const prices = {
      Regular: 5000,
      Vip: 110000,
      VVIP: 250000,
    };

    const handleQuantityChange = (value, amount) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [value]: Math.max(1, prevQuantities[value] + amount), // Prevent negative quantities
      }));
    };

    const handlePackageClick = (value) => {
      setSelectedPackage(value);

      if(value === "Regular"){
        setRegularDetails(true)
      } else if (value === "Vip"){
        setVipdetails(true);
      } else if (value === "VVIP"){
        setVvipdetails(true);
      }
      console.log(value)
    };


    //check
  const [errorMessage, setErrorMessage] = useState(''); // State for error message


    const check = (event) => {
      event.preventDefault();
   if(!selectedPackage){
    setErrorMessage('Please select a ticket package');
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return;
   }
   if(!firstName || !lastName || !email || !phoneNumber || !gender){
    setErrorMessage('Please fill in all fields');
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return;
   }
      handlePaystackPayment()
    };
    

    const copyToClipboard = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ticketId)
          .then(() => {
            setCopyButtonText("Copied");
          })
          .catch((error) => {
            console.error('Error copying to clipboard:', error);
            alert('Failed to copy Ticket ID. Please try again.');
          });
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = ticketId;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopyButtonText("Copied");
          } else {
            alert('Failed to copy Ticket ID. Please try again.');
          }
        } catch (error) {
          console.error('Error copying to clipboard:', error);
          alert('Failed to copy Ticket ID. Please try again.');
        }
    
        document.body.removeChild(textArea);
      }
    };


    const Amount = quantities[selectedPackage] * prices[selectedPackage];

    const handlePaystackPayment = async () => {
      const paystackPublicKey = "pk_live_d3ce6d705e141445156ba3ca5a51ec8738aa66d7";
      //  const paystackPublicKey = "pk_live_3247756c59ed492b8f73ac45f270ef9949bb87e1";
    
      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email: email, 
        amount: Amount * 100, 
        currency: 'NGN', 
        callback: function(response) {
          handleSubmit(response.reference);
        },
        onClose: function() {
          console.warn('Payment was not completed!')
        }
      });
    
      handler.openIframe();
    };

    //
    const handleSubmit = async (reference) => {
      setShowPopup(true)
      const totalAmount = quantities[selectedPackage] * prices[selectedPackage];
      try {
        emailjs.init("FFQYAzaYAjzv1DFb9")
        const docRef =  await addDoc(collection(txtdb, 'tickets'), {
          firstName,
          lastName,
          email,
          phoneNumber,
          gender,
          reference: reference,
          package: selectedPackage,
          quantity: quantities[selectedPackage],
          totalAmount,
        });
        await updateDoc(docRef, {
          TicketId: docRef.id,
        });
        setTicketId(docRef.id);
        console.log(ticketId)
        console.log('Ticket purchase successful!');
         emailjs.send("service_mpundp7", "template_q9bpwir", {
          to_email: email,
          userEmail: email,
          TicketId: docRef.id,
          totalPrice: totalAmount,
          to_name: firstName,
          from_name: "UNIFEST Tickets",
          reply_to: "noreply",
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          gender: gender,
          selectedPackage: selectedPackage,
          quantity: quantities[selectedPackage],
          totalAmount: totalAmount,
          // other variables you want to include in your email template
        }).then((response) => {
          console.log('Email sent successfully:', response);
              // Clear the input fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setGender("");
        setSelectedPackage(null);
        setQuantities({
          Regular: 1,
          VIP: 1,
          VVIP: 1,
        });
        })
        handleSubs();
        setShowPopup(false)
        setCompleted(true)
      } catch (error) {
        console.error('Error adding ticket:', error);
        alert('Error purchasing ticket. Please try again.');
      }
    };

    const [isVvipSoldOut, setIsVvipSoldOut] = useState(true); // Assume VVIP is sold out

    
    

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

            <div
                className={`package noquantity ${selectedPackage? 'quantity' : ''}`}
            >
            {selectedPackage && (
        <div className="quantity-selector">
          <span>{selectedPackage}, Qty: </span>
          <div className="qty">
          <button onClick={() => handleQuantityChange(selectedPackage, -1)}>-</button>
          <span>{quantities[selectedPackage]}</span>
          <button onClick={() => handleQuantityChange(selectedPackage, 1)}>+</button>
          </div>
        </div>
        )}
            </div>
            </div>
            
          <form onSubmit={check}>

            <div className="top">
              <input
                 type="text"
                 id="firstName"
                 name="firstName"
                 placeholder="First Name"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                required />
              <input 
               type="text"
               id="lastName"
               name="lastName"
               placeholder="Last Name"
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
                required />
            </div>


            <div className="bottom">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>

              <input 
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} />

              <label htmlFor="gender">Gender</label>
             <select 
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required>
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

            <button
            type={selectedPackage === "VVIP" && isVvipSoldOut ? "button" : "submit"}
            disabled={selectedPackage === "VVIP" && isVvipSoldOut}
            style={{
              backgroundColor: selectedPackage === "VVIP" && isVvipSoldOut ? "#d3d3d3" : "",
              color: selectedPackage === "VVIP" && isVvipSoldOut ? "#555" : "#fff",
              cursor: selectedPackage === "VVIP" && isVvipSoldOut ? "not-allowed" : "pointer"
            }}
          >
            {selectedPackage === "VVIP" && isVvipSoldOut ? (
              <h3>Sold Out</h3>
            ) : (
              <h3>
                Checkout {selectedPackage && (
                  <div>
                    &#8358;{(quantities[selectedPackage] * prices[selectedPackage]).toLocaleString()}
                  </div>
                )}
              </h3>
            )}
          </button>

          {selectedPackage === "VVIP" && (
            <p style={{ textAlign: "center", color: "#ff6f61", marginTop: "20px", fontWeight: "500" }}>
              Contact 0812-952-6952 for VVIP access and Enquiries.
            </p>
          )}

                {errorMessage && (
            <p style={{ color: 'red', textAlign: 'center', padding: '10px', fontWeight: '500' }}>
              {errorMessage}
            </p>
            )}



            
          </form>


        </div>

      </div>

      {regulardetails && (
      <div className='checkout-popup'>


        <div className='checkout-container tickets'>

      <h1>Regular Access -   &#8358;5,000</h1>

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
  
          
      <h1>VVIP Access -   &#8358;250,000 (Table For 5)</h1>

      <ul>
        <li>5 Persons Access Only</li>
        <li>1 Private car Park</li>
        <li>Access To Special VIP Arena</li>
        <li>Vip Entry and Sitting At The Festival</li>
        <li>Complimentary Bottle Of Martini</li>
        <li>Complimentary Bottle Of Martel</li>
        <li>Complimentary Platter of Small Chops </li>
        <li>Personal Waiter Assigned to The Vip Table</li>
        <li>You May Leave And Re-Enter The Festival At Any Time</li>
        <li>Mixer</li>
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

      <h1>VIP Access - &#8358;110,000 (2 Persons)</h1>
      
        <ul>
          <li>2 Persons Access Only</li>
          <li>Access To Special VIP Arena</li>
          <li>Vip Entry and Sitting At The Festival</li>
          <li>Complimentary Bottle Of Martini</li>
          <li>Complimentary Platter of Small Chops </li>
          <li>Personal Waiter Assigned to The Vip Table</li>
          <li>You May Leave And Re-Enter The Festival At Any Time</li>
          <li>Mixer</li>
        </ul>

     <div className='buttons tickets'>
          <button onClick={() => setVipdetails(false)} className="a"> Close</button>
      </div>

        </div>
        </div>
    )}

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


        <div className='ticketID'>

        <div className="checkbox-wrapper">
          <input defaultChecked={false} type="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
                </div>

      <h1>Ticket Purchased!</h1>
      <h3>Ticket ID: {ticketId}</h3>
      {/* <h3>Ticket ID: ymekhq5cvYsabWmNl99T</h3> */}
      <button 
       className={`button ${copyButtonText === "Copied" ? "copied" : ""}`}
      onClick={copyToClipboard}>{copyButtonText}</button>


      <p>Details of your ticket has been sent to your email.</p>

     <div className='buttons'>
          <button onClick={() => setCompleted(false)} className="a ">Buy again</button>
          <button onClick={() => navigate('/')} className="a again">Back to website</button>
      </div>

        </div>
        </div>
    )} 
     

    </div>
  </div>
  )
}

export default Tickets