import React, { useState, useEffect } from "react";
import { doc, collection, getDoc } from "firebase/firestore";
import { auth, txtdb } from "../../firebase-config";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

import UserNav from "../App-components/UserNav";

function UserProfile() {
  const [addressData, setAddressData] = useState({
    addressLine1: "",
  });

  const [loading, setLoading] = useState(true);

  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Session persistence successfully enabled
  })
  .catch((error) => {
    console.error("Error enabling session persistence:", error);
  });

  useEffect(() => {
    document.title = "My Profile-Evanis enteriors";

    const fetchAddressData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = doc(collection(txtdb, "users"), userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setAddressData(userData.address);
        } else {
          console.log("No address data found for the current user.");
        }
      } else {
        console.log("No authenticated user found.");
      }
      setLoading(false);
    };

    fetchAddressData();
  }, []);

  useEffect(() => {
    const cachedAddressData = localStorage.getItem("addressData");
    if (cachedAddressData) {
      setAddressData(JSON.parse(cachedAddressData));
      setLoading(false);
    } else {
      const fetchAddressData = async () => {
        // Fetch address data from Firestore as before
      };
      fetchAddressData();
    }
  }, []);
  
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("addressData", JSON.stringify(addressData));
    }
  }, [addressData, loading]);
  

  return (
    <div className="">
      <UserNav />

      <div className="appContainer">
        {loading ? ( // Render loading indicator while data is being fetched
          <p>Loading...</p>
        ) : addressData ? ( // Render address data if available
          <>
            <h2>Your Address:</h2>
            <p>Address Line 1: {addressData.addressLine1}</p>
          </>
        ) : (
          // Render message if no address data is found
          <p>No address data found for the current user.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
