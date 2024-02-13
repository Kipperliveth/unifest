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

        <div className="about-section">
          <div className="abt-sec-container">
            <div className="abt-sec-left">
              <h3>Get to know us</h3>

              <h1>
                <span>See</span> what we're about and how we can design
                interiors for you
              </h1>

              <p>
                Explore our company's essence and gain insight into how our
                tailored designs can cater to your unique needs.
              </p>

              <NavLink to="/about">Learn More</NavLink>
            </div>

            <div className="abt-sec-right"></div>
          </div>
        </div>

        <div className="newsletter-section">
          <div className="newsletter-container">
            <h3>
              <span>Stay</span> in the loop!
            </h3>

            <h1>
              Subscribe to our newsletter for the <span>latest updates</span>,
              offers, and design inspiration.
            </h1>
            <span></span>

            <p>
              Join our community and get access to special offers and early bird
              discounts,expert tips, industry news, and product updates straight
              from our team.
            </p>

            <div className="sub-container">
              <input type="text" placeholder="Enter email address" />
              <button>Subscribe</button>
            </div>

            <h6>We promise not to spam you</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
