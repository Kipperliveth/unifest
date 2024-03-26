import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useAuth, upload } from "./UseAuth";
import { BiUserCircle } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
import { useUpload } from "./UseAuth";

function ProfilePicture() {
  const upload = useUpload();
  //
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhototURL] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDUsQDpDYZTltD4JVCjpIYr2utsAYFDlAhO5qEWUHcQ&s"
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
    setErrorMessage("");
  }

  function handleClick() {
    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 2000);

    if (!photo) {
      setErrorMessage("Please choose a display picture");
      return;
    }
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhototURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div className="onboarding">
      <div className="uploadProfilePicture">
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
              <p>
                <IoIosCheckmarkCircle className="completed-icon" />
              </p>
              <h4>Username</h4>
            </span>
          </div>
          <div className="profilePicture">
            <span>
              <p className="current-page">3</p>
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

        <div className="upload-profilePicture-Container">
          <h2>Choose a Profile Picture</h2>
          <input type="file" onChange={handleChange} />
          <button onClick={handleClick}>
            {isLoggedIn ? (
              <ImSpinner8 className="onboarding-spinner" />
            ) : (
              "Save Picture"
            )}
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {/* <img src={photoURL} alt="profile" /> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;
