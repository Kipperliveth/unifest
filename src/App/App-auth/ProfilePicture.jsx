import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

function ProfilePicture() {
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
      </div>
    </div>
  );
}

export default ProfilePicture;
