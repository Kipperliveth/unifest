import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { PiHandWavingFill } from "react-icons/pi";
import { ImSpinner8 } from "react-icons/im";

function Login() {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const login = async (event) => {
    event.preventDefault();

    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 2000);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate("/marketplace");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  //google auth
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    navigate("/userDashboard");
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div className="login-left">
          <h1>
            Welcome Back! <PiHandWavingFill className="wave-icon" />
          </h1>
          <p>Enter login details to proceed to dashboard</p>
          <button className="google-login" onClick={signInWithGoogle}>
            <FcGoogle className="google-icon" /> <h3>Log in with Google</h3>
          </button>

          <div className="or">
            <span></span>
            <h4>or</h4>
            <span></span>
          </div>

          <form className="login-form">
            <div className="emailnpassword">
              <h2>Email</h2>
              <input
                className="email-input"
                type="email"
                placeholder="mail@placeholder.com"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="emailnpassword">
              <h2>Password</h2>
              <input
                type="password"
                placeholder="your password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
                required
              />
            </div>

            <div className="forgot-pass">
              <NavLink>Forgot password?</NavLink>
            </div>

            <button onClick={login} className="login-btn">
              {isLoggedIn ? (
                <ImSpinner8 className="login-spinner" />
              ) : (
                "Sign In"
              )}
            </button>

            {error && (
              <p className="passcheck">{`invalid email or password`}</p>
            )}

            <p className="sign-up-link">
              Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </form>
        </div>

        <div className="login-right"></div>
      </div>
    </div>
  );
}

export default Login;
