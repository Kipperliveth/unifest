import React, { useState, useEffect } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { txtdb } from "../../firebase-config";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(
      collection(txtdb, "notifications"),
      orderBy("timestamp", "desc")
    ); // Query to order by timestamp in descending order

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => {
        let timestamp;
        if (doc.data().timestamp instanceof Date) {
          timestamp = doc.data().timestamp; // If timestamp is already a Date object, use it directly
        } else {
          timestamp = new Date(doc.data().timestamp); // Convert Unix timestamp to Date object
        }
        return {
          id: doc.id,
          ...doc.data(),
          timestamp: timestamp.toLocaleString([], {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminNotifications-content">
        <h1>AdminNotifications</h1>

        <div>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                {notification.message} on {notification.timestamp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNotifications;
