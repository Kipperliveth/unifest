import React, { useState, useEffect } from "react";
import UserNav from "../App-components/UserNav";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { txtdb } from "../../firebase-config";
import { auth } from "../../firebase-config";
import {
  collection, addDoc,
  getDocs, doc, deleteDoc,
  onSnapshot, query, where, setDoc, getDoc, updateDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import emailjs from 'emailjs-com';
import { MdKeyboardArrowLeft } from "react-icons/md";

emailjs.init("Ubd9KrlkMCBa72PUL");


function Cart() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true); // New loading state
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

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

//shipping state
const [selectedShipping, setSelectedShipping] = useState('');
const [totalPrice, setTotalPrice] = useState(0);


const handleShippingChange = (e) => {
  const shippingMethod = e.target.value;
  setSelectedShipping(shippingMethod);

  let shippingCost = 0;
  if (shippingMethod === 'PICKUP') {
    shippingCost = 500; // Example shipping cost for pickup
  } else if (shippingMethod === 'DOOR DELIVERY') {
    if(addressData.city === 'Iwofe' || 'Rupokwu' || "Eleme Junction" || "Adageorge" ||"Borokiri" || "Akpajo" || "Adageorge" || "Agip" || "Abuloma" || "Atali" || "Eliozu" || "Elelewon" || "Odili" || "Eneka" || "Woji"){
      shippingCost = 3000; // Example shipping cost for pickup
    } else if (addressData.city === 'Choba' || 'Aluu' || "Alakahia" || "Rumuokoro" || "Rumuosi"){
      shippingCost = 2500; // Example shipping cost for pickup
    }

  } 

  setTotalPrice(shippingCost);
  console.log(totalPrice)
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

const totalPriceWithShipping = getTotalPriceNumeric + totalPrice;

const formattedTotalPriceWithShipping = totalPriceWithShipping.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });



useEffect(() => {
  document.title ="Cart Unifest"
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
      const currentQuantity = productData.quantity || 0;

      // Prevent quantity from going below 1
      if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        await setDoc(docSnapshot.ref, { ...productData, quantity: newQuantity });

        // Update the local state
        setProductQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: newQuantity,
        }));
      }
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

  // useEffect(() => {
  //   const cachedAddressData = localStorage.getItem("addressData");
  //   if (cachedAddressData) {
  //     setAddressData(JSON.parse(cachedAddressData));
  //     setLoading(false);
  //   } else {
  //     const fetchAddressData = async () => {
  //       // Fetch address data from Firestore as before
  //     };
  //     fetchAddressData();
  //   }
  // }, []);

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
date15DaysFromNow.setDate(currentDate.getDate() + 7);

// Calculate the date 20 days from now
const date20DaysFromNow = new Date(currentDate);
date20DaysFromNow.setDate(currentDate.getDate() + 14);

// Format the dates as "day month"
const options = { day: 'numeric', month: 'short' };
const formattedDate15DaysFromNow = date15DaysFromNow.toLocaleDateString('en-US', options);
const formattedDate20DaysFromNow = date20DaysFromNow.toLocaleDateString('en-US', options);



useEffect(() => {
  console.log(selectedShipping);
}, [selectedShipping]);

// pop up spinner
const [showPopup, setShowPopup] = useState(false);

//completed
const [completed, setCompleted] = useState(false)
const [orderID, setOrderID] = useState(""); // New state variable for Order ID


//delete cart
const deletecart = async () => {
  const userId = currentUser.uid;

    // Get all documents in the collection
    const productRef = collection(txtdb, `userCart/${userId}/products`);
    const querySnapshot = await getDocs(productRef);


   // Delete each document
   const deletePromises = querySnapshot.docs.map((document) => deleteDoc(doc(txtdb, `userCart/${userId}/products`, document.id)));
   await Promise.all(deletePromises);
}



// order email
const userEmail = auth.currentUser?.email;
const userName = user.displayName;

//checkout logic
const [notCompleted, setNotCompleted] = useState(false)

console.log(window.PaystackPop,userEmail,  "pasystack" );
const amount = getTotalPriceNumeric + totalPrice; // Total amount including shipping

const check = () => {
  if (!selectedShipping) {
    setErrorMessage('Please choose a shipping option');
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return;
  }
  
  if (selectedShipping === "DOOR DELIVERY" && !addressData.addressLine1) {
    setErrorMessage('Please add a Delivery Address');
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return;
  }
  
  if (selectedShipping === "PICKUP" && !addressData.addressPhone) {
    setErrorMessage('Add a number for pick up');
    setNotCompleted(true);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return;
  }
  handlePaystackPayment()
};

const [transactionReference, setTransactionReference] = useState('')


const handlePaystackPayment = async () => {
  const paystackPublicKey = "pk_live_3247756c59ed492b8f73ac45f270ef9949bb87e1";

  const handler = window.PaystackPop.setup({
    key: paystackPublicKey,
    email: userEmail, 
    amount: amount * 100, 
    currency: 'NGN', 
    callback: function(response) {
      setTransactionReference(response.reference);
      handleCheckout();
    },
    onClose: function() {
      setTransactionReference('Payment was not completed');
      console.warn('Payment was not completed')
    }
  });

  handler.openIframe();
};



const handleCheckout = async () => {
  
if (!selectedShipping) {
  setErrorMessage('Please choose a shipping option');
  setTimeout(() => {
    setErrorMessage('');
  }, 5000);
  return;
}
if (selectedShipping === "DOOR DELIVERY" && !addressData.addressLine1) {
  setErrorMessage('Please add a Delivery Address');
  setTimeout(() => {
    setErrorMessage('');
  }, 5000);
  return;
}
if (selectedShipping === "PICKUP" && !addressData.addressPhone){
  setErrorMessage('Add a number for pick up');
  setNotCompleted(true);
  setTimeout(() => {
    setErrorMessage('');
  }, 5000);
  return;
}
setShowPopup(true);

  try {
    // Get the current user's ID
    const userId = currentUser.uid;

    // Create a new order document in the "orders" collection
    const orderRef = await addDoc(collection(txtdb, "orders"), {
      userId: userId, // Store the user's ID in the order document
      cartItems: fetchedProducts, // Store the contents of the user's cart
      totalPrice: getTotalPriceNumeric, // Store the total price of the order
      deliveryFee: totalPrice,
      shippingOption: selectedShipping, // Store the selected shipping option
      address: addressData.addressLine1,
      callLine: addressData.addressPhone,
      city: addressData.city,
      state: addressData.state,
      userEmail: userEmail,
      username: userName,
      reference: transactionReference,
      formattedDate15DaysFromNow: formattedDate15DaysFromNow,
      formattedDate20DaysFromNow: formattedDate20DaysFromNow,
      createdAt: new Date(), // Store the current date and time as the creation date
    });
  

   // Get the email content
let emailContent = `
`;
// Loop through fetchedProducts array to include product name and quantity
fetchedProducts.forEach((product, index) => {
emailContent += `\n    - ${product.txtVal} (x ${product.quantity})`;
});
;

    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const timestamp = formattedDate;
    //  await sendEmailNotification(userEmail, orderRef.id);
    emailjs.send("service_1i849ri", "template_7ful5o4", {
  to_email: userEmail,
  userEmail: userEmail,
  message: emailContent,
  orderRefId: orderRef.id,
  city: addressData.city,
  state: addressData.state,
  totalPrice: getTotalPriceNumeric,
  deliveryFee: totalPrice,
  to_name: userName,
  timestamp: timestamp,
  estimatedDelivery: `${formattedDate15DaysFromNow} and ${formattedDate20DaysFromNow}`,
  from_name: "UNIFEST Merch"
  // other variables you want to include in your email template
})
.then((response) => {
  console.log('Email sent successfully:', response);
  setOrderID(orderRef.id)
  //user app notifications

  try {
    const timestamp = new Date().toISOString();
     addDoc(collection(txtdb, `userNotifications/${userId}/inbox`), {
      orderRefId: orderRef.id,
      state: addressData.state,
      city: addressData.city,
      formattedDate15DaysFromNow: formattedDate15DaysFromNow,
      formattedDate20DaysFromNow: formattedDate20DaysFromNow,
      timestamp: timestamp
    });
    // addDoc(collection(txtdb, `userNotifications/${userId}/myorders`), {
    //   orderRefId: orderRef.id,
    //   state: addressData.state,
    //   cartItems: fetchedProducts, // Store the contents of the user's cart
    //   totalPrice: getTotalPriceNumeric, // Store the total price of the order
    //   shippingOption: selectedShipping, // Store the selected shipping option
    //   formattedDate15DaysFromNow: formattedDate15DaysFromNow,
    //   formattedDate20DaysFromNow: formattedDate20DaysFromNow,
    //   timestamp: timestamp,
    //   satus: "pending delivery"
    // });
     addDoc(collection(txtdb, 'notifications'), {
      orderRefId: orderRef.id,
      timestamp: timestamp,
      userEmail: userEmail,
      username: userName,

    });

    const orderData = {
      status: "confirmed",
      date: timestamp,
         orderRefId: orderRef.id,
      state: addressData.state,
      city: addressData.city,
      cartItems: fetchedProducts, // Store the contents of the user's cart
      totalPrice: getTotalPriceNumeric, // Store the total price of the order
      deliveryFee: totalPrice,
      shippingOption: selectedShipping, // Store the selected shipping option
      formattedDate15DaysFromNow: formattedDate15DaysFromNow,
      formattedDate20DaysFromNow: formattedDate20DaysFromNow,
      address: addressData.addressLine1,
      callLine: addressData.addressPhone,
      delivery: 'Ordered on'
    };
    const neworder = collection(txtdb, `userNotifications/${userId}/deliveredOrders`)
    addDoc(neworder, orderData)
  .then((docRef) => {
    const documentId = docRef.id; // Access the automatically generated ID
    console.log('Document successfully added with ID:', documentId);
    // You can now use the documentId for further operations
    updateDoc(doc(txtdb, `userNotifications/${userId}/deliveredOrders/${documentId}`), {
     docRef: docRef.id,
   }).then(() => {
    deletecart();
   })
  })

    console.log("Notification added");
  } catch (error) {
    console.error("Error adding notification:", error);
  }
setShowPopup(false);
setCompleted(true);

})
.catch((error) => {
  console.error('Email send error:', error);
  setShowPopup(false);

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

          { isLoading ? (
            <div className="loading-message">
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
            </div>
   
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
             
            </div>
   
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
            </div>
   
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
            </div>
   
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
            </div>
   
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
            </div>
          </div>
          ) : (

        <div>
                { fetchedProducts.length === 0 ?(
                  <div className="empty-cart">
            <MdOutlineShoppingCart className="cart-icon" />
            <h3>Your cart is empty</h3>
            <p>
            Browse through the exclusive Unifest merch and find the perfect fit to show off your Vybe.
            </p>
            <NavLink to="/merch">Start Shopping</NavLink>
          </div>
                ) : (
                  <div className='cart'>

                    <div className="cart-container main-container">
                      
                {fetchedProducts.map((product, index) => (
                    <div key={index} className="cart-item">
                        {/* <p>{product.productId}</p> */}

                        <div className="product-info">

                          <div className="info">
                        <img src={product.imgUrl} alt={product.txtVal} />

                        <div className="name-desc">
                        <h3>{product.txtVal}</h3>
                        {product.color && <p><span>Color:</span> {product.color}</p>}
                        {product.size && <p><span>Size:</span> {product.size}</p>}

                        {/* <p>{product.quantity}</p> */}
                         <p className="mobile">
                      &#8358;&nbsp;
                        {(parseFloat(product.price) * product.quantity).toLocaleString("en-US")}
                      </p>
                        </div>

                          </div>

                        <div className="price desktop">
                        <p>
                      &#8358;&nbsp;
                        {(parseFloat(product.price) * product.quantity).toLocaleString("en-US")}
                      </p>
                        </div>

                        </div>

                        <div className="cart-control">
                        <button className="delete-btn"  onClick={() => handleDeleteProduct(product.productId)}> <CiTrash className="delete-icon"/> <p>Remove</p></button>

                        <div className="quantity-counter">
                          <button  onClick={() => handleDecreaseQuantity(product.productId)}><FiMinus className="count-icon" disabled={productQuantities[product.productId] <= 1}/></button>
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
                  <h6>DELIVERY {addressData.addressLine1 || !addressData.addressPhone ? "ADDRESS": "NUMBER"} <NavLink to='/editAddress'>EDIT</NavLink></h6>

                  <p>{addressData.addressLine1 ? addressData.addressLine1 : addressData.addressPhone}</p>

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
                  id="pickup"
                  name="shipping"
                  value="PICKUP"
                checked={selectedShipping === 'PICKUP'}
                onChange={handleShippingChange}
                />
                <label htmlFor="pickup">Pick up at Abuja park(Choba)</label>
                </div>
                

                <div className="state">
                <input
                  type="radio"
                  id="others"
                  name="shipping"
                  value="DOOR DELIVERY"
                    checked={selectedShipping === 'DOOR DELIVERY'}
                onChange={handleShippingChange}
                />
                <label htmlFor="others">Door delivery to {addressData.city}</label>
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              </div>



                  </div>

                  <div className="total">
                    <p>Total <span>{formattedTotalPriceWithShipping}</span></p>
                  <li>Shipping included</li>
                  </div>

                  <button className='checkout'  onClick={check} disabled={completed || isLoading}>Checkout</button>


                </div>



                </div>
                )}

                
        </div>
        )}
         
          
        </div>

            {showPopup && (
        <div className="popup">

          <div className="spinner">
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

      {completed && (
        <div className='checkout-popup'>

            <div className='close-btn'><MdKeyboardArrowLeft className='icon'/> <NavLink to='/merch' className='button'>Home</NavLink> </div>

          <div className='checkout-container'>

          <div className="checkbox-wrapper">
          <input defaultChecked={false} type="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
                </div>

        <h2>Order Confirmed</h2>


        <p>Thank you for buying the Unifest Merch! <br /> We will contact you soon for delivery.</p>
        <p>Order ID: <span>{orderID}</span></p>

       <div className='buttons'>
            <NavLink to= '/merch'>Continue Shopping</NavLink>
            <NavLink to='/myorders'> Order Details</NavLink>
        </div>

          </div>
          </div>
      )}

      {notCompleted && (
        <div className='addNumber'>


          <div className='checkout-container'>

        <p>Please Add a number as a way to reach you when your order is ready for pickup</p>

       <div className='buttons'>
            <button onClick={() => setNotCompleted(false)} className="a">Cancel</button>
            <NavLink onClick={() => setNotCompleted(false)} to='/addNumber' className="a again">Add Number</NavLink>
        </div>

          </div>
          </div>
      )}  


      </div>
    </div>
  );
}

export default Cart;
