import React, { useState, useEffect } from "react";
import { doc, collection, getDoc } from "firebase/firestore";
import { auth, txtdb } from "../../firebase-config";
import {
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import UserNav from "../App-components/UserNav";

function UserProfile() {
  const [user, setUser] = useState({});

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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  return (
    <div className="">
      <UserNav />

      <div className="appContainer">
        <div className="info">
          <div className="profilePic-info">
            <img src={user?.photoURL} alt="displayPicture" />

            <div className="user-details-info">
              <p className="user-email">{user.email}</p>
              <p className="username-info"> {user?.displayName}</p>
            </div>
          </div>

          <div className="address-info-header">
            <h2>My Shipping Information</h2>
          </div>

          <div className="address-info">
            {loading ? ( // Render loading indicator while data is being fetched
              <p>Loading...</p>
            ) : addressData ? ( // Render address data if available
              <>
              <span>
              <h3>Address:</h3>
               <p>{addressData.addressLine1}</p>
              </span>

              <span>
                <h3>
                Your Number:
                </h3>
                <p> {addressData.addressPhone}</p>
              </span>

              <span>
                <h3>
                State:
                </h3>
                <p> {addressData.state}</p>
              </span>

              <span>
                <h3>
                  City:
                </h3>
                <p> {addressData.city}</p>
              </span>
              </>
            ) : (
              // Render message if no address data is found
              <p>No address data found for the current user.</p>
            )}
          </div>

          <button>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
