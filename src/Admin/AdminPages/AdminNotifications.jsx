import React, { useState, useEffect } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { txtdb } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { PiNotePencilLight } from "react-icons/pi";


function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [readNotifications, setReadNotifications] = useState([]);
const [showPopup, setShowPopup] = useState(false);



  useEffect(() => {
    document.title = "Notifications Evanis-Interiors";

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  
    return () => unsubscribe();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    if (!user) return; // Return early if user is null

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

    //read notifs

    useEffect(() => {
      if (!user) return; // Return early if user is null
    
      const q = query(
        collection(txtdb, `ReadAdminNotifications`),
        orderBy("timestamp", "desc")
      );
    
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newwNotifications = snapshot.docs.map((doc) => {
          let timestamp;
          if (doc.data().timestamp instanceof Date) {
            timestamp = doc.data().timestamp;
          } else {
            timestamp = new Date(doc.data().timestamp);
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
        // Count the number of unread notifications
        setReadNotifications(newwNotifications);
        setIsLoading(false);
  
  
      });
    
      return () => unsubscribe();
    }, [user]);

      //delete function
  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteDoc(doc(collection(txtdb, `notifications`), notificationId));
      console.log("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  

  const handleMarkNotificationAsRead = async (notification) => {
setShowPopup(true);

    try {
      const readNotificationData = {
          orderRefId: notification.id,
        username:notification.username,
        userEmail:notification.userEmail,
      timestamp: notification.timestamp
      };
  
      // Only add state and formattedDate fields if they are defined in the notification
      if (notification.state) {
        readNotificationData.state = notification.state;
      }
      if (notification.formattedDate15DaysFromNow) {
        readNotificationData.formattedDate15DaysFromNow = notification.formattedDate15DaysFromNow;
      }
      if (notification.formattedDate20DaysFromNow) {
        readNotificationData.formattedDate20DaysFromNow = notification.formattedDate20DaysFromNow;
      }
  
      await addDoc(collection(txtdb, `ReadAdminNotifications`), readNotificationData);
      console.log("Notification marked as read and moved to read notifications");
      await handleDeleteNotification(notification.id);
      setShowPopup(false);
      
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setShowPopup(false);

    }
  };


  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content">Admin Notifications</h2>

      <div className="adminNotifications-content">

      <h2 className="admin-current-page desktop-content">Admin Notifications</h2>


              <div className="notification-container page">

        <p className="recent"><span></span>New<span></span></p>

        <div>
        {isLoading ? (
          <div className="loading-message">
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>
          </div>
        ) : (

            <div className="notifications">
            {notifications.map((notification) => (

              <div className="notification" key={notification.id}>

                <div className="left"> <PiNotePencilLight className="icon"/></div>

                <div className="right">
                    <h4>You have recieved an order with ID: {notification.orderRefId}</h4>
                    <p>from {notification.username} / {notification.userEmail}</p>
                    <p>Contact customer for delivery fees</p>
                    <h5>To complete this order and view delivery details, go to the Orders section</h5>
                    <span>

                    <p className="date">{notification.timestamp}</p> <button onClick={() => handleMarkNotificationAsRead(notification)}>Mark as Read</button>
                    
                    </span>
                </div>

              </div>
              
            ))}
            </div>
        )}

        </div>

        <p className="recent"><span></span>Older<span></span></p>

        <div className="read">
        {isLoading ? (
          <div className="loading-message">
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-III"></div>
              <div className="loading-text-II"></div>
            </div>
          </div>
        ) : (

            <div className="notifications">
            {readNotifications.map((readNotification) => (

              <div className="notification" key={readNotification.id}>

                <div className="left"> <PiNotePencilLight className="icon"/></div>

                <div className="right">
                    <h4>You have recieved an order with ID: {readNotification.orderRefId}</h4>
                    <p>from {readNotification.username} / {readNotification.userEmail}</p>
                    <p>Contact customer for delivery fees</p>
                    <h5>To complete this order and view delivery details, go to the Orders section</h5>
                    <span>

                    <p className="date">{readNotification.timestamp}</p> <button>Read</button>
                    
                    </span>
                </div>

              </div>
              
            ))}
            </div>
        )}

        </div>

        </div>


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
  );
}

export default AdminNotifications;
