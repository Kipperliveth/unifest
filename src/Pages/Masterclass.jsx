import React from "react";
import { NavLink } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

function Masterclass() {
  return (
    <div className="pagewidth">
      <div className="masterclass">
        {/*  */}
        <div className="masterclass-landing">
          <h1>Join our Masterclass</h1>
        </div>

        <div className="masterclass-enroll">
          <div className="enroll-left">
            <h1>
              <span>Master</span> the Art of Interior <span>Design</span> with
              Our Certified Masterclass.
            </h1>
            <p>
              Turn your passion for design into a profession with our
              Masterclass and get certified. Get hands-on with expert-led
              instruction and real-world projects.
            </p>

            <div className="class-cta">
              <NavLink>Enroll Now</NavLink>

              <NavLink>
                <p>Login to Dashboard</p> <BsBoxArrowUpRight />
              </NavLink>
            </div>
          </div>
          <div className="enroll-right"> </div>
        </div>

        <div className="masterclass-details">
        
        </div>
      </div>
    </div>
  );
}

export default Masterclass;
