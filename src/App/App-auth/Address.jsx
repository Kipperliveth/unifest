import React, { useState } from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, txtdb } from "../../firebase-config";

function Address() {
  const [addressData, setAddressData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveAddressToFirestore(addressData); // Call function to save data
    // Handle success or error based on the returned value (optional)
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

  return (
    <div className="onboarding">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={addressData.addressLine1}
          onChange={handleChange}
        />
        {/* Add similar input fields for other address components */}
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
}

export default Address;
