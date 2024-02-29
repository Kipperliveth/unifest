import React from "react";
import UserNav from "../App-components/UserNav";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Cart() {
  return (
    <div>
      <UserNav />
      <div className="cart-page">
        <div className="cart-container">
          <h1>My Cart</h1>

          <div className="empty-cart">
            <MdOutlineShoppingCart className="cart-icon" />
            <h3>Your cart is empty</h3>
            <p>
              Explore our wide selection of products and find the perfect fit
              for you.
            </p>
            <NavLink to="/store">Start Shopping</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
