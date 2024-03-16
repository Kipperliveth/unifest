import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import aboutImage from "../stock/team_collaboration_re_ow29.svg";
import { IoCreateOutline } from "react-icons/io5";
import { BiCertification } from "react-icons/bi";
import { ImSpinner } from "react-icons/im";
import { PiUserFocusLight } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";

import {
  MdOutlineLeaderboard,
  MdOutlineWorkspacePremium,
  MdApproval,
  MdDetails,
  MdOutlineDesignServices,
} from "react-icons/md";

function About() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    document.title = "About-Evanis Interiors";

    if (!hasMounted) {
      setHasMounted(true);
      AOS.init({
        delay: 200,
      });
    } else {
      AOS.refresh();
    }
  }, [hasMounted]);

  return (
    <div className="pagewidth">
      <div className="about">
        <div className="about-header">
          <h1>About Us </h1>
        </div>

        <div className="about-story">
          <div className="abt-story-left">
            <h3
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
              At <span>EVANIS INTERIORS</span>
            </h3>

            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-once="true"
            >
              we believe that every space has the potential to tell a story,
              evoke emotions, and inspire connections. Our journey began with a
              simple yet profound passion for transforming ordinary spaces into
              extraordinary experiences.
            </p>

            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <NavLink className="about-page-cta">
                <div>See our work</div>
                <FaInstagram className="cta-insta" />
              </NavLink>
            </div>
          </div>

          <div
            className="abt-story-right"
            data-aos="zoom-in-left"
            data-aos-duration="800"
            data-aos-delay="600"
            data-aos-once="true"
          >
            <img src={aboutImage} alt="about-us" />
          </div>
        </div>

        <div className="about-values">
          <span className="values-header">
            <h1
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
              data-aos-once="true"
            >
              Our <span>Values</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
              At the heart of our company lie our core values, guiding
              principles that drive every aspect of our work:
            </p>
          </span>

          <div className="value-container">
            <div
              className="levalues"
              data-aos="zoom-in-left"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
              <IoCreateOutline className="value-icon first" />
              <h3>Creativity</h3>
              <p>
                We believe in pushing the boundaries of design, embracing
                innovation, and exploring new possibilities to create spaces
                that captivate and inspire.
              </p>
            </div>
            <div
              className="levalues"
              data-aos="zoom-out-left"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-once="true"
            >
              <BiCertification className="value-icon second" />
              <h3>Authenticity</h3>
              <p>
                Our commitment to authenticity ensures that every design
                reflects the unique personality, preferences, and aspirations of
                our clients.
              </p>
            </div>
            <div
              className="levalues"
              data-aos="zoom-in-left"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <MdOutlineLeaderboard className="value-icon third" />
              <h3>Excellence</h3>
              <p>
                We strive for excellence in everything we do, from concept
                development and execution to customer service and project
                delivery.
              </p>
            </div>
            <div
              className="levalues"
              data-aos="zoom-out-left"
              data-aos-duration="800"
              data-aos-delay="700"
              data-aos-once="true"
            >
              <MdOutlineWorkspacePremium className="value-icon fourth" />
              <h3>Sustainability</h3>
              <p>
                We are dedicated to sustainable design practices, incorporating
                eco-friendly materials, energy-efficient solutions, and mindful
                processes to minimize our environmental footprint.
              </p>
            </div>
          </div>
        </div>

        <div className="about-unique">
          <div>
            <h1
              className="levalues"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              What Makes us <span>Unique</span>{" "}
            </h1>
          </div>

          <div className="abt-unique-container">
            <div
              className="leunique"
              data-aos="zoom-in-right"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>
                <MdApproval className="unique-icon" />
                <h3>Tailored Approach</h3>
              </span>
              <p>
                We understand that no two clients are alike, which is why we
                take a personalized approach to every project, tailoring our
                designs to suit individual lifestyles, tastes, and preferences.
              </p>
            </div>

            <div
              className="leunique"
              data-aos="zoom-out-right"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>
                <MdDetails className="unique-icon" />{" "}
                <h3>Attention to Detail</h3>{" "}
              </span>
              <p>
                Our meticulous attention to detail ensures that every aspect of
                the design, from the layout and materials to the finishing
                touches, is carefully considered and thoughtfully executed.
              </p>
            </div>

            <div
              className="leunique"
              data-aos="zoom-in-right"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>
                <ImSpinner className="unique-icon" /> <h3>Innovation</h3>
              </span>
              <p>
                We embrace innovation and embrace emerging trends, technologies,
                and design concepts, constantly pushing the boundaries of
                creativity to deliver cutting-edge solutions.
              </p>
            </div>

            <div
              className="leunique"
              data-aos="zoom-out-right"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>
                <PiUserFocusLight className="unique-icon" />{" "}
                <h3>Client-Centric Focus</h3>
              </span>
              <p>
                Our clients are at the center of everything we do. We listen, we
                collaborate, and we prioritize their needs, striving to exceed
                expectations and create lasting relationships built on trust and
                integrity.
              </p>
            </div>

            <div
              className="leunique"
              data-aos="zoom-in-right"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-once="true"
            >
              <span>
                <MdOutlineDesignServices className="unique-icon" />{" "}
                <h3>Passion for Design</h3>
              </span>
              <p>
                Our team shares a passion for design, fueling our drive to
                constantly innovate, explore, and create spaces that inspire and
                delight.
              </p>
            </div>
          </div>
        </div>

        <div className="about-touch">
          <h1
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
            data-aos-once="true"
          >
            Get Started Now
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="500"
            data-aos-once="true"
          >
            <NavLink to="/contact" className="about-page-cta">
              <div>Lets Design For You</div>
              <TiMessages className="cta-insta" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
