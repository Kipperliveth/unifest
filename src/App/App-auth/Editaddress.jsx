import React, { useState } from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, txtdb } from "../../firebase-config";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";


function Editaddress() {

    const [showPopup, setShowPopup] = useState(false);
    const [addressData, setAddressData] = useState({
      addressLine1: "",
      addressPhone: "",
      city: "",
      state: "",
    });
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoggedIn(true);

  
      if (
        !addressData.addressLine1 ||
        !addressData.addressPhone ||
        !addressData.state ||
        !addressData.city
      ) {
        setErrorMessage("Please fill in all fields."); // Set error message
        setIsLoggedIn(false);
        return; // Stop further execution
      }
  
      try {
        await saveAddressToFirestore(addressData); // Call function to save data
        // Navigate to another page upon successful submission
        setShowPopup(true);
        setIsLoggedIn(false);

      } catch (error) {
        console.error("Error saving address to Firestore:", error);
        // Handle error, if any
        setIsLoggedIn(false);
      }
    };
  
    const handleChange = (event) => {
      setAddressData({ ...addressData, [event.target.name]: event.target.value });
    };
  
    // ... rest of your component (form submission logic)
  
    const saveAddressToFirestore = async (addressData) => {
      const user = auth.currentUser; // Get current user
  
      if (user) {
        const userId = user.uid; // Get user ID if user exists
        const userRef = doc(collection(txtdb, "users"), userId);
        await setDoc(userRef, { address: addressData }, { merge: true }); // Update user doc with address
        return addressData; // Return the saved address data (optional)
      } else {
        // Handle the scenario when there's no authenticated user
        console.error("No authenticated user found.");
        return null;
      }
    };
  
    const nextPage = () => {
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(false);
      }, 2000);
      navigate("/cart");
    };

    return (
        <div className="onboarding">
          <div className="uploadAddress">


    
            <div className="upload-address-container edit">
              <h2>Edit your Shipping Address</h2>
    
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Delivery Address"
                  value={addressData.addressLine1}
                  onChange={handleChange}
                />
    
                <input
                  type="tel"
                  name="addressPhone"
                  placeholder="Your phone number"
                  value={addressData.addressPhone}
                  onChange={handleChange}
                />
    
                <select
                  name="state"
                  value={addressData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="Rivers">Rivers</option>
                </select>

                <select
                  name="city"
                  value={addressData.city}
                  onChange={handleChange}
                >
                  <option value="">Select Region</option>
                  <option value="Choba">Choba</option>
                  <option value="Alakahia">Alakahia</option>
                  <option value="Aluu">Aluu</option>
                  <option value="Eliozu">Eliozu</option>
                  <option value="Rumuokoro">Rumuokoro</option>
                  <option value="Agip">Agip</option>
                  <option value="Waterlines">Waterlines</option>
                  <option value="Iwofe">Iwofe</option>
                  <option value="Adageorge">Adageorge</option>
                  <option value="Abuloma">Abuloma</option>
                  <option value="Borokiri">Borokiri</option>
                  <option value="Eleme Junction">Eleme Junction</option>
                  <option value="Elelewon">Elelewon</option>
                  <option value="Odili">Odili</option>
                  <option value="Woji">Woji</option>
                  <option value="Eneka">Eneka</option>
                  <option value="Rupokwu">Rupokwu</option>
                  <option value="Atali">Atali</option>
                  <option value="Akpajo">Akpajo</option>
                  <option value="Rumuosi">Rumuosi</option>
                </select>
    
                {/* Add similar input fields for other address components */}
                <button className="edit-btn" type="submit">
                  {isLoggedIn ? (
                    <ImSpinner8 className="onboarding-spinner" />
                  ) : (
                    "Save Address"
                  )}
                </button>
              </form>
    
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
    
            {showPopup && (
            <div className="popup">

          <div className="popup-container edit-container">

              <FaCheck className="completed-icon" />
              <p>Your information has been Edited successfully!</p>
              <button onClick={nextPage}>
                {isLoggedIn ? (
                  <ImSpinner8 className="onboarding-spinner" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
            </div>
            )}
          </div>
        </div>
      );
}

export default Editaddress