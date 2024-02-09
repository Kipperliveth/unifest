import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Home() {
  return (
    <div className="pagewidth ">
      <div className="home">
        <div className="landing">
          <div className="landing-content-container">
            <h1>Transform Your Space to a Place of Beauty and Comfort</h1>
            <p>
              Conceptual. Custom. Yours. We design interiors that tell your
              story through unique details and bespoke furniture
            </p>

            <button className="cta">
              <span>Get Started</span>
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="shop-section">
          <h1>Design Your Dream, Piece by Piece</h1>

          <p>Shop customizable furnitures to match your style and space</p>

          <div className="shop-items">
            <NavLink to="/shop" className="clm one">
              <h2 className="top-desc">Seating Furniture</h2>

              <h3 className="bottom-desc">Sofas and Couches</h3>
            </NavLink>

            <NavLink to="/shop" className="clm two">
              <h2 className="top-desc">Tables & Surfaces</h2>

              <h3 className="bottom-desc">Desks and Dining</h3>
            </NavLink>

            <NavLink to="/shop" className="clm three">
              <h2 className="top-desc">Storage & Organanisation</h2>

              <h3 className="bottom-desc">Beds, Wardrobes</h3>
            </NavLink>

            <NavLink to="/shop" className="clm four">
              <h2 className="top-desc">Speciality & Decor</h2>

              <h3 className="bottom-desc">Mirrors, Lighting</h3>
            </NavLink>
          </div>

          <button className="shop-cta">
            <span>Go To Shop</span>
            <FaArrowRightLong className="ctaArrow special-icon" />
          </button>
        </div>

        <div className="masterclass-section">
          <div className="m-container">
            <div className="m-sec-left"></div>

            <div className="m-sec-right">
              <h3>Join our Masterclass</h3>

              <h1>
                <span> Unlock </span>Your Interior Design Potential and Master
                the Art from certified experts
              </h1>

              <p>
                Discover the secrets to stunning interiors with our exclusive
                Masterclass. From basics to advanced techniques, our expert
                instructors guide you every step of the way. Elevate your skills
                and unleash your creativity. Enroll now and transform your space
                today.
              </p>

              <NavLink to="/masterclass" className="masterclass-cta">
                <p>Enroll Now</p>
                <FaArrowRightLong />
              </NavLink>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Home;
