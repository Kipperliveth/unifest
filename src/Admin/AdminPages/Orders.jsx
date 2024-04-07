import React from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { txtdb } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

function Orders() {
  const handleClick = async () => {
    try {
      const timestamp = new Date().toISOString();
      await addDoc(collection(txtdb, 'notifications'), {
        message: 'new message',
        timestamp: timestamp
      });
      console.log("Notification added");
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminNotifications adminContent">
        <h2>Orders</h2>

        <button onClick={handleClick}>Like</button>
      </div>
    </div>
  );
}

export default Orders;
