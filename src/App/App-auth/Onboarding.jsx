import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function Onboarding() {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const handleProfileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: username,
      address: address,
    })
      .then(() => {
        // Profile updated successfully
        console.log("Profile updated!");
        // You can navigate to the next page or perform any other action here
      })
      .catch((error) => {
        // An error occurred
        console.error("Error updating profile:", error);
      });
  };

  //
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="onboarding">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br />
      <button onClick={handleProfileUpdate}>Save</button>

      <div>
        {" "}
        {userData && (
          <div>
            <h2>Welcome, {userData.displayName}!</h2>
            {userData.photoURL && <img src={userData.photoURL} alt="Profile" />}
            {userData.bio && <p>Bio: {userData.bio}</p>}
            {userData.address && <p>Address: {userData.address}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
{
  /* <input type='file' name='profilePic'/><br /> */
}
