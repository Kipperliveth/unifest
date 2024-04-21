import React, { useState, useEffect } from "react";
import UserNav from "../App-components/UserNav";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { txtdb } from "../../firebase-config";
import { auth } from "../../firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] =useState({})
  const [loading, setLoading] = useState(true); // New loading state

  //skeleton loading
  const [isLoading, setIsLoading] = useState(true);

  
  const [fetchedProducts, setFetchedProducts] = useState([]);
  
  
  const currentUser = auth.currentUser;


  const fetchProducts = async () => {
    console.log("Fetching products...");
  setIsLoading(true);

    if (currentUser) {
        const userId = currentUser.uid;
        const productRef = collection(txtdb, `userCart/${userId}/products`); // User-specific cart collection

        try {
            const querySnapshot = await getDocs(productRef);
            const products = querySnapshot.docs.map((doc) => doc.data());
            setFetchedProducts(products);
            console.log("Products fetched:", products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Set loading state to false after fetching
           setIsLoading(false); 
        }
    }
};

useEffect(() => {
  document.title ="Cart Evanis-Interiors"
    fetchProducts();
}, [currentUser]); // Fetch products whenever currentUser changes


useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
}, [auth]);


useEffect(() => {
  setIsLoading(true);
  fetchProducts().then(() => {
    setIsLoading(false); 
  });
}, []);


 
  

  return (
    <div>
      <UserNav />
      <div className="cart-page">
        <div className="cart-container">
          <h1>My Cart</h1>
          {/* <div className="empty-cart">
            <MdOutlineShoppingCart className="cart-icon" />
            <h3>Your cart is empty</h3>
            <p>
              Explore our wide selection of products and find the perfect fit
              for you.
            </p>
            <NavLink to="/store">Start Shopping</NavLink>
          </div> */}


        {isLoading ? (
          <div className="loading-message">
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>
          </div>
        ) : (
          <div className='cart'>

            <div className="cart-container">
              
        {fetchedProducts.map((product, index) => (
            <div key={index} className="cart-item">
                {/* <p>{product.productId}</p> */}

                <div className="product-info">

                  <div className="info">
                <img src={product.imgUrl} alt={product.txtVal} />

                <div className="name-desc">
                <h3>{product.txtVal}</h3>
                <p>{product.desc}</p>
                </div>

                  </div>

                <div className="price">
                <p> &#8358;&nbsp;{product.price}</p>
                </div>

                </div>

                <div className="cart-control">
                <button className="delete-btn"> <CiTrash className="delete-icon"/> <p>Remove</p></button>

                <div className="quantity-counter">
                  <button><FiMinus className="count-icon" /></button>
                  <p>1</p>
                  <button><FaPlus  className="count-icon" /></button>
                </div>
                </div>

                {/* Render other product details */}
            </div>
        ))}

        </div>

        <div className="cart-summary">
          <h2>Cart summary</h2>
        </div>



        </div>
        )}
         
          
        </div>
      </div>
    </div>
  );
}

export default Cart;
