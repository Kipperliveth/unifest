import React, { useState, useEffect } from "react";
import UserNav from "../App-components/UserNav";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { txtdb } from "../../firebase-config";
import { auth } from "../../firebase-config";
import {
  collection, addDoc,
  getDocs, doc, deleteDoc,
  onSnapshot, query, where, setDoc, getDoc
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
    setIsLoading(true);
  
    if (currentUser) {
      const userId = currentUser.uid;
      const productRef = collection(txtdb, `userCart/${userId}/products`);
      try {
        const querySnapshot = await getDocs(productRef);
        const products = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setFetchedProducts(products);
        // Update product quantities in the local state
        const quantities = {};
        products.forEach((product) => {
          quantities[product.id] = product.quantity || 1;
        });
        setProductQuantities(quantities);
        console.log("Products fetched:", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
        setIsLoading(false);
      }
    }
  };

  // Inside the fetchProducts function
useEffect(() => {
  if (currentUser) {
    fetchProducts();

  const unsubscribe = onSnapshot(collection(txtdb, `userCart/${currentUser.uid}/products`), (snapshot) => {
    const updatedProducts = [];
    snapshot.forEach((doc) => {
      updatedProducts.push({ id: doc.id, ...doc.data() });
    });
    setFetchedProducts(updatedProducts);
  });

  return () => unsubscribe();
}
}, [currentUser]);



//
const handleDeleteProduct = async (productId) => {
  const userId = currentUser.uid;
  const productRef = collection(txtdb, `userCart/${userId}/products`);
  const querySnapshot = await getDocs(query(productRef, where("productId", "==", productId)));

  try {
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref); // Delete the document from the database
    });
    const updatedProducts = fetchedProducts.filter(product => product.productId !== productId);
    setFetchedProducts(updatedProducts); // Update the state without the deleted product
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

  // Calculate total price of products in the cart
const getTotalPrice = () => {
  let totalPrice = 0;
  fetchedProducts.forEach((product) => {
    totalPrice += parseFloat(product.price) *
    ( product.quantity).toLocaleString('en-US');
  });
  return totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });
};
//


const getTotalPriceNumeric = parseFloat(getTotalPrice().replace(/[^\d.-]/g, ''));

const totalPriceWithShipping = getTotalPriceNumeric;

const formattedTotalPriceWithShipping = totalPriceWithShipping.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });



useEffect(() => {
  document.title ="Cart Evanis-Interiors"
    fetchProducts();
    // getTotalPrice();
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

//
// Define state to track the quantity of each product in the cart
const [productQuantities, setProductQuantities] = useState({});

useEffect(() =>{
setProductQuantities(productQuantities)
}, [])

// Inside the handleIncreaseQuantity function
const handleIncreaseQuantity = async (productId) => {
  try {
    const userId = currentUser.uid;
    const productQuery = query(collection(txtdb, `userCart/${userId}/products`), where("productId", "==", productId));
    const querySnapshot = await getDocs(productQuery);

    if (!querySnapshot.empty) {
      // If a document with the matching product ID is found, update its quantity
      const docSnapshot = querySnapshot.docs[0];
      const productData = docSnapshot.data();
      const newQuantity = (productData.quantity || 0) + 1;
      await setDoc(docSnapshot.ref, { ...productData, quantity: newQuantity });

      // Update the local state
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    } else {
      console.error("Product not found in the cart.");
    }
  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};


// Inside the handleDecreaseQuantity function
const handleDecreaseQuantity = async (productId) => {
  try {
    const userId = currentUser.uid;
    const productRef = collection(txtdb, `userCart/${userId}/products`);
    const querySnapshot = await getDocs(query(productRef, where("productId", "==", productId)));

    if (!querySnapshot.empty) {
      // If a document with the matching product ID is found, update its quantity
      const docSnapshot = querySnapshot.docs[0];
      const productData = docSnapshot.data();
      const newQuantity = Math.max((productData.quantity || 0) - 1, 0);
      await setDoc(docSnapshot.ref, { ...productData, quantity: newQuantity });

      // Update the local state
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    } else {
      console.error("Product not found in the cart.");
    }
  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};

// Inside the Cart component
const totalItems = fetchedProducts.reduce((total, product) => total + product.quantity, 0);

//address
 const [addressData, setAddressData] = useState({
    addressLine1: "",
  });
 
   useEffect(() => {

    const fetchAddressData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = doc(collection(txtdb, "users"), userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setAddressData(userData.address);
        } else {
          console.log("No address data found for the current user.");
        }
      } else {
        console.log("No authenticated user found.");
      }
      setLoading(false);
    };

    fetchAddressData();
  }, []);

  useEffect(() => {
    const cachedAddressData = localStorage.getItem("addressData");
    if (cachedAddressData) {
      setAddressData(JSON.parse(cachedAddressData));
      setLoading(false);
    } else {
      const fetchAddressData = async () => {
        // Fetch address data from Firestore as before
      };
      fetchAddressData();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("addressData", JSON.stringify(addressData));
    }
  }, [addressData, loading]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

// Get the current date
const currentDate = new Date();

// Calculate the date 15 days from now
const date15DaysFromNow = new Date(currentDate);
date15DaysFromNow.setDate(currentDate.getDate() + 15);

// Calculate the date 20 days from now
const date20DaysFromNow = new Date(currentDate);
date20DaysFromNow.setDate(currentDate.getDate() + 20);

// Format the dates as "day month"
const options = { day: 'numeric', month: 'short' };
const formattedDate15DaysFromNow = date15DaysFromNow.toLocaleDateString('en-US', options);
const formattedDate20DaysFromNow = date20DaysFromNow.toLocaleDateString('en-US', options);

//shipping state
const [selectedShipping, setSelectedShipping] = useState('');

const handleShippingChange = (e) => {
  setSelectedShipping(e.target.value);

};

useEffect(() => {
  console.log(selectedShipping);
}, [selectedShipping]);

//spinner
const [showPopup, setShowPopup] = useState(false);


//checkout logic

const handleCheckout = async () => {
setShowPopup(true);

  try {
    // Get the current user's ID
    const userId = currentUser.uid;

    // Create a new order document in the "orders" collection
    const orderRef = await addDoc(collection(txtdb, "orders"), {
      userId: userId, // Store the user's ID in the order document
      cartItems: fetchedProducts, // Store the contents of the user's cart
      totalPrice: getTotalPriceNumeric, // Store the total price of the order
      shippingOption: selectedShipping, // Store the selected shipping option
      address: addressData.addressLine1,
      callLine: addressData.addressPhone,
      city: addressData.city,
      state: addressData.state,
      createdAt: new Date(), // Store the current date and time as the creation date
    });

    console.log("Order created with ID: ", orderRef.id);
  } catch (error) {
    console.error("Error creating order:", error);
    setShowPopup(false);

  }
};

  

  return (
    <div>
      <UserNav />
      <div className="cart-page ">
        <div className="cart-container page">
          <h1>My Cart</h1>

          {fetchedProducts.length === 0 ? (
          <div className="empty-cart">
            <MdOutlineShoppingCart className="cart-icon" />
            <h3>Your cart is empty</h3>
            <p>
              Explore our wide selection of products and find the perfect fit
              for you.
            </p>
            <NavLink to="/store">Start Shopping</NavLink>
          </div>
          ) : (

<div>
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
                {/* <p>{product.quantity}</p> */}
                </div>

                  </div>

                <div className="price">
                <p>
              &#8358;&nbsp;
                {(parseFloat(product.price) * product.quantity).toLocaleString("en-US")}
              </p>
                </div>

                </div>

                <div className="cart-control">
                <button className="delete-btn"  onClick={() => handleDeleteProduct(product.productId)}> <CiTrash className="delete-icon"/> <p>Remove</p></button>

                <div className="quantity-counter">
                  <button  onClick={() => handleDecreaseQuantity(product.productId)}><FiMinus className="count-icon" /></button>
                  <p>{product.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(product.productId)}><FaPlus  className="count-icon" /></button>
                </div>
                </div>

                {/* Render other product details */}
            </div>
        ))}

        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>
          <p>Subtotal: <span>{getTotalPrice()}</span></p>
          <p>Items(+QTY): <span>{totalItems}</span></p>

          <div className="address">
          <h6>DELIVERY ADDRESS <NavLink to='/editAddress'>EDIT</NavLink></h6>

          <p>{addressData.addressLine1}</p>

          </div>

          <div className="delivery">
          <h6>DELIVERY DETAILS</h6>

          <div className="estimate">
            <p>Delivery between <span>{formattedDate15DaysFromNow}</span> and <span>{formattedDate20DaysFromNow}</span></p>
          </div>

         <div className="shipping-state">

         <div className="state">
        <input
          type="radio"
          id="lagos"
          name="shipping"
          value="LAGOS"
        checked={selectedShipping === 'LAGOS'}
        onChange={handleShippingChange}
        />
        <label htmlFor="lagos">Shipping(LAGOS)</label>
         </div>
         

        <div className="state">
        <input
          type="radio"
          id="others"
          name="shipping"
          value="OTHERS"
            checked={selectedShipping === 'OTHERS'}
        onChange={handleShippingChange}
        />
        <label htmlFor="others">Shipping(OTHERS)</label>
        </div>

      </div>



          </div>

          <div className="total">
            <p>Total <span>{formattedTotalPriceWithShipping}</span></p>
          <li>Shipping not included</li>
          </div>

          <button className='checkout' onClick={handleCheckout}>Checkout</button>


        </div>



        </div>
        )}

        
</div>
)}
         
          
        </div>

            {showPopup && (
        <div className="popup">

          <div class="spinner">
            <div></div>   
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
            <div></div>    
          </div>


        </div>
      )}
      </div>
    </div>
  );
}

export default Cart;
