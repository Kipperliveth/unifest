import React, {useState, useEffect} from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { txtdb } from "../../firebase-config";
import { collection, onSnapshot, getDocs, doc, setDoc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import emailjs from 'emailjs-com';

emailjs.init("0AYqWDKbnCvVpNyW6");


function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(txtdb, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(orders);
  }, [orders]);

  //search
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);


  const handleSearch = () => {
    const filtered = isFirstPage ? 
      orders.filter(order => {
        const formattedDate = formatDate(order.createdAt.toDate());
        return order.id.includes(searchInput) || formattedDate.includes(searchInput);
      }) :
      completedOrders.filter(order => {
        const formattedDate = formatDate(new Date(order.completionDate));
        return order.id.includes(searchInput) || formattedDate.includes(searchInput);
      });
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    handleSearch(); // Run search on initial mount to populate filteredOrders
  }, [orders]);

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  //modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  //completed?
  const [isFirstPage, setIsFirstPage] = useState(true);

  const markAsCompleted = async () => {
    setIsLoggedIn(true);
    const userID = selectedOrder.userId;

    if (selectedOrder) {
      const completedOrderData = {
        ...selectedOrder,
        completionDate: new Date().toISOString()
      };

      try {
        await setDoc(doc(txtdb, "completed", selectedOrder.id), completedOrderData);
              // Delete the order from the "orders" collection
      // await deleteDoc(doc(txtdb, "orders", selectedOrder.id));
      // addDoc(collection(txtdb, `userNotifications/${userID}/deliveredOrders`), {
      //   orderRefId: selectedOrder.id,
      //   satus: "pending",
      //   cart: completedOrderData.cartItems,
      //   state: completedOrderData.state,
      //   totalPrice: completedOrderData.totalPrice,
      //   completionDate: completedOrderData.completionDate,
      //   addresss: completedOrderData.address
      // });
      //
      const orderData = collection(txtdb, `userNotifications/${userID}/deliveredOrders`);
      const orderDatadb = await getDocs(orderData);
      const orderDataArray = orderDatadb.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("orderdata", orderDataArray[0].docRef);
      
      const selectedOrderId = selectedOrder.id;
      console.log(selectedOrderId)

// Loop through the orderDataArray and find the document with matching orderRefId
      let foundDoc = null;
      for (let doc of orderDataArray) {
          if (doc.orderRefId === selectedOrderId) {
              foundDoc = doc;
              break;
          }
      }

      if (foundDoc) {
          console.log("Document containing matching order data:", foundDoc);
      } else {
          console.log("No document found containing the matching order ID.");
          setIsLoggedIn(false);

      }

      const documentId = foundDoc.docRef;
      console.log('documnet ref', documentId)
            //
            await deleteDoc(doc(txtdb, "orders", selectedOrder.id)).then(() =>{
        updateDoc(doc(txtdb, `userNotifications/${userID}/deliveredOrders/${documentId}`),{
          status: "Delivered",
          date: completedOrderData.completionDate,
          delivery: 'Delivered on'
        })
      }).finally(() => {
        addDoc(collection(txtdb, `userNotifications/${userID}/deliverynotifications`), {
          orderRefId: selectedOrderId,
          timestamp:completedOrderData.completionDate,
          userEmail: selectedOrder.userEmail,
          username: selectedOrder.username
        }).then(() => {

          let emailContent = `
          We are pleased to inform you that your package with order ID:${selectedOrderId}  has been successfully delivered.

          Delivery Details:

          Order ID: ${selectedOrderId}
          Delivery Date: ${completedOrderData.completionDate}

          Thank you for choosing Evanis Interiors.
          
          If you have any queries about your order or need further assistance, please to contact our customer support team.
          `

          emailjs.send("service_w7spb28", "template_qlj2ich", {
            to_email: selectedOrder.userEmail,
            userEmail: selectedOrder.userEmail,
            message: emailContent,
            orderRefId: selectedOrderId,
            username: selectedOrder.username,
            from_name: "Evanis Interiors"
            // other variables you want to include in your email template
          })

        })
      })    
      
            //
            closeModal();
            setIsLoggedIn(false);

              console.log("Order marked as completed and added to Firebase.");
            } catch (error) {
              console.error("Error adding document: ", error);
              setIsLoggedIn(false);

            }
          }
        };

  //
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(txtdb, "completed"), (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompletedOrders(orders);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content">Orders</h2>
      
      <div className="adminNotifications adminContent">

      <h2 className="admin-current-page desktop-content">Orders</h2>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by Order ID or Date" 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
        />
        <button onClick={handleSearch}><FaSearch className="icon"/>Search</button>
      </div>

      <div className='completed'>
      <button className={isFirstPage ? 'active' : ''} onClick={() => setIsFirstPage(true)}>New Orders <span>{orders.length}</span></button>
      <button className={isFirstPage ? '' : 'notactive'} onClick={() => setIsFirstPage(false)}>Completed Orders</button>
    </div>
      {isFirstPage ? 
        <div className="first">

        {loading ? (
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
          <div className="orderList">
            <div className="order head">
              <div>Order ID</div>
              <div>Username</div>
              <div className="desktop">Total</div>
              <div className="date">Date Ordered</div>
              <div className='status'>Status</div>
            </div>
            {filteredOrders.map(order => (
              <div className="order" key={order.id} onClick={() => openModal(order)} style={{ cursor: "pointer" }}>
                <p className="orderID">{order.id}</p>
                <p>{order.username}</p>
                <p className="desktop">{parseFloat(order.totalPrice).toLocaleString('en-US')}</p>
                <p>{formatDate(order.createdAt.toDate())}</p>
                <p className="status">Pending</p>

              </div>
            ))}

            {filteredOrders.length === 0 ? (
            <p className="no-notifications">No pending orders</p> 
              ) : null}
          </div>
        )}
  
  
        <div className={`product-modal ${isModalOpen ? "open" : ""}`}>
        {selectedOrder && (
          <div className="modal-container">
  
            <div className="modal-details">
            <button onClick={closeModal} className="back"><MdOutlineKeyboardArrowLeft /> Orders</button>
  
            <div className="head">
  
              <div className="route"><p>Dashboard</p><MdOutlineKeyboardArrowRight className="icon"/><p>Orders</p><MdOutlineKeyboardArrowRight className="icon"/><p className='id'>ID {selectedOrder.id}</p></div>
  
              <div className="header">
                <span>
                <h1>Order ID: {selectedOrder.id}</h1>
                  <button onClick={markAsCompleted} > {isLoggedIn ? (
                  <ImSpinner8 className="login-spinner" />
                ) : (
                  "Mark as completed"
                )} <FaCheck className="icon"/></button>
                </span>
  
                <div className="dates">
                  <div className="p first">Order Date: <h4>{formatDate(selectedOrder.createdAt.toDate())}</h4></div>
                  <div className="p second"><FaTruck className="icon"/> Estimated delivery between: {selectedOrder.formattedDate15DaysFromNow} - {selectedOrder.formattedDate20DaysFromNow} </div>
                </div>
              </div>
            </div>
  
            <div className="cart-details">
            
              {selectedOrder.cartItems.map((item, index) => (
                <div className='cart' key={index}>
  
                  <div className="left">
                    <span><img src={item.imgUrl} alt='description'/></span>
  
                    <span>
                  <p className="name">{item.txtVal}</p>
                  <p>{item.desc}</p>
                  </span>
                  
  
                  </div>
  
                  <div className="right">
                  <p className="price">&#8358;{parseFloat(item.price).toLocaleString('en-US')}</p>
                  <p>Qty: {item.quantity}</p>
                  </div>
  
                </div>
              ))}
            
            </div>
  
              <div className="bottom">
  
  
              <div className="left">
                <h2>Customer Profile</h2>
               <p>Email: <span>{selectedOrder.userEmail}</span> </p>
               <p>Username: <span>{selectedOrder.username}</span> </p>
               <p className="elip">User ID: <span>{selectedOrder.userId}</span> </p>
  
              </div>
  
              <div className="right">
            <h2>Delivery</h2>
            <h3>Address</h3>
            <p> {selectedOrder.address}</p>
            <p> {selectedOrder.shippingOption}/{selectedOrder.state}</p>
             <p>{selectedOrder.callLine}</p>
             <h3>Total Price(shipping not included)</h3>
            <p>&#8358;{parseFloat(selectedOrder.totalPrice).toLocaleString('en-US')}</p>
              </div>
              </div>
  
          
  
            </div>
  
          </div>
        )}
        </div>
        </div>
      :
      <div className="second">

      {loading ? (
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
        <div className="orderList">
          <div className="order head">
            <div>Order ID</div>
            <div>Username</div>
            <div className="desktop">Total</div>
            <div className="date">Date Completed</div>
            <div className='status'>Status</div>
          </div>
          {filteredOrders.map(order => (
            <div className="order" key={order.id} onClick={() => openModal(order)} style={{ cursor: "pointer" }}>
              <p className="orderID">{order.id}</p>
              <p>{order.username}</p>
              <p className="desktop">{parseFloat(order.totalPrice).toLocaleString('en-US')}</p>
              <p>{order.completionDate ? formatDate(new Date(order.completionDate)) : ""}
</p>
              <p className="status">Completed</p>
            </div>
          ))}

          {filteredOrders.length === 0 ? (
            <p className="no-notifications">Completed orders will show here</p> 
              ) : null}
        </div>
      )}


      <div className={`product-modal ${isModalOpen ? "open" : ""}`}>
      {selectedOrder && (
        <div className="modal-container">

          <div className="modal-details">
          <button onClick={closeModal} className="back"><MdOutlineKeyboardArrowLeft /> Orders</button>

          <div className="head">

            <div className="route"><p>Dashboard</p><MdOutlineKeyboardArrowRight className="icon"/><p>Orders</p><MdOutlineKeyboardArrowRight className="icon"/><p className='id'>ID {selectedOrder.id}</p></div>

            <div className="header">
              <span>
              <h1>Order ID: {selectedOrder.id}</h1>
                <button>Completed<FaCheckDouble className="icon"/></button>
              </span>

              <div className="dates">
                <div className="p first">Order Date: <h4>{formatDate(selectedOrder.createdAt.toDate())}</h4></div>
                <div className="p second"><FaTruck className="icon"/> Delivered on: {selectedOrder.completionDate ? formatDate(new Date(selectedOrder.completionDate)) : ""}
 </div>
              </div>
            </div>
          </div>

          <div className="cart-details">
          
            {selectedOrder.cartItems.map((item, index) => (
              <div className='cart' key={index}>

                <div className="left">
                  <span><img src={item.imgUrl} alt='description'/></span>

                  <span>
                <p className="name">{item.txtVal}</p>
                <p>{item.desc}</p>
                </span>
                

                </div>

                <div className="right">
                <p className="price">&#8358;{parseFloat(item.price).toLocaleString('en-US')}</p>
                <p>Qty: {item.quantity}</p>
                </div>

              </div>
            ))}
          
          </div>

            <div className="bottom">


            <div className="left">
              <h2>Customer Profile</h2>
             <p>Email: <span>{selectedOrder.userEmail}</span> </p>
             <p>Username: <span>{selectedOrder.username}</span> </p>
             <p className="elip">User ID: <span>{selectedOrder.userId}</span> </p>

            </div>

            <div className="right">
          <h2>Delivery</h2>
          <h3>Address</h3>
          <p> {selectedOrder.address}</p>
          <p> {selectedOrder.shippingOption}/{selectedOrder.state}</p>
           <p>{selectedOrder.callLine}</p>
           <h3>Total Price(shipping not included)</h3>
          <p>&#8358;{parseFloat(selectedOrder.totalPrice).toLocaleString('en-US')}</p>
            </div>
            </div>

        

          </div>

        </div>
      )}
      </div>
      </div>}
      
       
      </div>

 


    </div>
  );
}


export default Orders;
