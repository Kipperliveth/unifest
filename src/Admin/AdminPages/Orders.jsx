import React from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { txtdb } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";



function Orders() {
  

  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content">Orders</h2>
      
      <div className="adminNotifications adminContent">

      <h2 className="admin-current-page desktop-content">Orders</h2>


        <button>Like</button>
      </div>
    </div>
  );
}

export default Orders;
