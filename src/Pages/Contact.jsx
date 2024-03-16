import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";

function Contact() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    document.title = "Contact-Evanis interiors";

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
      <div className="contact">
        <div className="contact-header">
          <h1>Contact Us</h1>
        </div>

        <div className="contact-form">
          <div className="form-left">
            <h1
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
              data-aos-once="true"
            >
              Get in <span>Touch</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-once="true"
            >
              If you need help ordering from the online store, enrolling for the
              masterclass or need a quote for a design idea
            </p>

            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-once="true"
            >
              <NavLink className="contact-page-cta">
                <div>Send a Form</div>
                <AiOutlineForm className="cta-form" />
              </NavLink>
            </div>
          </div>

          <div
            className="form-right"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="600"
            data-aos-once="true"
          >
            <form action="">
              <div className="top">
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="yourmail@gmail.com" required />
              </div>
              <div className="bottom">
                <textarea
                  name=""
                  id=""
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <button type="submit">
                <h3>Submit</h3> <VscSend className="submit-btn" />
              </button>

              <div className="form-socials">
                <FaInstagram className="icon" />
                <FaXTwitter className="icon" />
                <FaWhatsapp className="icon" />
                <MdMailOutline className="icon" />
              </div>
            </form>
          </div>
        </div>

        <div className="Faqs">
          <h1
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
            data-aos-once="true"
          >
            Frequently Asked Questions
          </h1>

          <div className="acc-wrap">
            <div className="accordion">
              <div className="left">
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="300"
                  data-aos-once="true"
                >
                  <input type="radio" id="one" name="item" />
                  <label htmlFor="one" className="title">
                    How to place an order?  
                  </label>
                  <div className="acc-content">
                    Ordering is easy! Simply browse our collection, add items to
                    your cart, and proceed to checkout. Follow the prompts to
                    enter your shipping details and preferred payment method to
                    complete the purchase.
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="400"
                  data-aos-once="true"
                >
                  <input type="radio" id="five" name="item" />
                  <label htmlFor="five" className="title">
                    Quality and sustainability of materials
                  </label>
                  <div className="acc-content">
                    We use high-quality, sustainable materials that are both
                    stylish and comfortable. Our furnitures are carefully selected
                    for their durability, and sustainability
                    credentials. We also use eco-friendly dyes and finishing
                    processes whenever possible.
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="500"
                  data-aos-once="true"
                >
                  <input type="radio" id="three" name="item" />
                  <label htmlFor="three" className="title">
                    What is our refund policy
                  </label>
                  <div className="acc-content">
                    We want you to be delighted with your purchase. Check out
                    our Return Policy for information on returns, exchanges, and
                    how to initiate a return request.
                  </div>
                </div>
              </div>

              <div className="right">
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="600"
                  data-aos-once="true"
                >
                  <input type="radio" id="four" name="item" />
                  <label htmlFor="four" className="title">
                    Do we offer custom designs or alterations?
                  </label>
                  <div className="acc-content">
                    Yes, we offer a variety of custom design and alteration
                    services to help you create the perfect decor.
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="700"
                  data-aos-once="true"
                >
                  <input type="radio" id="six" name="item" />
                  <label htmlFor="six" className="title">
                    How can I contact customer support?
                  </label>
                  <div className="acc-content">
                    Our dedicated support team is ready to assist you. Feel free
                    to reach out via our Contact Us page or email us at
                    support@example.com.
                  </div>
                </div>

                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="800"
                  data-aos-once="true"
                >
                  <input type="radio" id="two" name="item" />
                  <label htmlFor="two" className="title">
                    What are the shipping options available?
                  </label>
                  <div className="acc-content">
                    We offer various shipping options to suit your needs.
                    Explore our Shipping Information page for details on
                    delivery times, costs, and available services.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
