import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { PiReadCvLogoFill } from "react-icons/pi";
import { ImSpinner8 } from "react-icons/im";


function SignUp() {
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  // //
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 2000);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (password.length < 6) {
      setError("Password should be at least 6 characters long");
    } else {
      setError("");
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          confirmPassword
        );
        console.log(user);
        navigate("/marketplace");
      } catch (error) {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          setError("Email is already in use");
        }
        console.log(error.message);
      }
     
    }
  };


  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <div className="sign-left">
          <h1>Left</h1>
        </div>
        <div className="sign-right">
          <div className="head">
            <h1>Get Started!</h1> <PiReadCvLogoFill className="sign-icon" />
          </div>
          <p className="head-p">Learn. Shop. Design.</p>

          <form className="signup-form">
            <div className="emailnpassword">
              <h2>Email</h2>
              <input
                type="email"
                placeholder="example@gmail.com"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="emailnpassword">
              <h2>Password</h2>
              <input
                type="password"
                placeholder="your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="emailnpassword">
              <h2>Re-enter Password</h2>
              <input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>

            <button onClick={handleSubmit} className="sign-up-btn">
            {isLoggedIn ? (
                <ImSpinner8 className="signup-spinner" />
              ) : (
                "Sign In"
              )}
            </button>
            {error && <p className="error-msg">{error}</p>}
            <p className="login-link">
              Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
