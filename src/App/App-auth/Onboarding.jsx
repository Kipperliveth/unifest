import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { IoIosCheckmarkCircle } from "react-icons/io";

const auth = getAuth();

function Onboarding() {
  const [username, setUsername] = useState("");

  const handleProfileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: username,
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
      <div className="upload-username">
        <div className="progress">
          <div className="signUpPage">
            <span>
              <p>
                <IoIosCheckmarkCircle className="completed-icon" />
              </p>
              <h4>Email/Password</h4>
            </span>
          </div>
          <div className="userNamePage">
            <span>
              <p className="current-page">2</p>
              <h4>Username</h4>
            </span>
          </div>
          <div className="profilePicture">
            <span>
              <p>3</p>
              <h4>Display Photo</h4>
            </span>
          </div>
          <div className="addressPage">
            <span>
              <p>4</p>
              <h4>Shipping Address</h4>
            </span>
          </div>

          <div className="bar"></div>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <button onClick={handleProfileUpdate}>Save User</button>
      </div>

      {/* <div>
        {userData && (
          <div>
            <h2>Welcome, {userData.displayName}!</h2>
            {userData.photoURL && <img src={userData.photoURL} alt="Profile" />}
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Onboarding;
