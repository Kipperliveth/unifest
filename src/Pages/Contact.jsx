import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

function Contact() {
  return (
    <div className="pagewidth">
      <div className="contact">
        <div className="contact-header">
          <h1>Contact Us</h1>
        </div>

        <div className="contact-form">
          <div className="form-left">
            <h1>
              Get in <span>Touch</span>
            </h1>
            <p>
              If you need help ordering from the online store, enrolling for the
              masterclass or need a quote for a design idea
            </p>
            <NavLink className="contact-page-cta">
              <div>Send a Form</div>
              <AiOutlineForm className="cta-form" />
            </NavLink>

            {/* <h4>or</h4> */}
          </div>

          <div className="form-right">
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
          <h1>Frequently Asked Questions</h1>

          <div className="acc-wrap">
            <div className="accordion">
              <div className="left">
                <div className="item">
                  <input type="radio" id="one" name="item" />
                  <label htmlFor="one" className="title">
                    How to place an order?{" "}
                  </label>
                  <div className="acc-content">
                    Ordering is easy! Simply browse our collection, add items to
                    your cart, and proceed to checkout. Follow the prompts to
                    enter your shipping details and preferred payment method to
                    complete the purchase.{" "}
                  </div>
                </div>

                <div className="item">
                  <input type="radio" id="five" name="item" />
                  <label htmlFor="five" className="title">
                    Quality and sustainability of materials
                  </label>
                  <div className="acc-content">
                    We use high-quality, sustainable materials that are both
                    stylish and comfortable. Our fabrics are carefully selected
                    for their durability, breathability, and sustainability
                    credentials. We also use eco-friendly dyes and finishing
                    processes whenever possible.
                  </div>
                </div>

                <div className="item">
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
                <div className="item">
                  <input type="radio" id="four" name="item" />
                  <label htmlFor="four" className="title">
                    Do we offer custom designs or alterations?
                  </label>
                  <div className="acc-content">
                    {" "}
                    Yes, we offer a variety of custom design and alteration
                    services to help you create the perfect piece of clothing.
                    We can also make alterations to our garments to fit your
                    body perfectly.
                  </div>
                </div>

                <div className="item">
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

                <div className="item">
                  <input type="radio" id="two" name="item" />
                  <label htmlFor="two" className="title">
                    {" "}
                    What are the shipping options available?
                  </label>
                  <div className="acc-content">
                    {" "}
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
