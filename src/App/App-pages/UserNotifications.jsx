import React, { useState, useEffect } from "react";
import UserNav from "../App-components/UserNav";
import { collection, query, orderBy, deleteDoc, addDoc,doc, onSnapshot } from "firebase/firestore";
import { txtdb } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { PiNotePencilLight } from "react-icons/pi";


function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [readNotifications, setReadNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // State to store the count of unread notifications
  // pop up spinner
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
  
    const userId = user.uid;
    const q = query(
      collection(txtdb, `userNotifications/${userId}/inbox`),
      orderBy("timestamp", "desc")
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => {
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
      const unreadNotifications = newNotifications.filter((notification) => !notification.read);
      setUnreadCount(unreadNotifications.length);
      setNotifications(newNotifications);
      setIsLoading(false);


    });
  
    return () => unsubscribe();
  }, [user]); // Run whenever the user object changes
 
  //read notifs

  useEffect(() => {
    if (!user) return; // Return early if user is null
  
    const userId = user.uid;
    const q = query(
      collection(txtdb, `userNotifications/${userId}/read`),
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
      const userId = currentUser.uid;
      await deleteDoc(doc(collection(txtdb, `userNotifications/${userId}/inbox`), notificationId));
      console.log("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  

  const handleMarkNotificationAsRead = async (notification) => {
setShowPopup(true);

    try {
      const userId = currentUser.uid;
      const readNotificationData = {
          orderRefId: notification.id,
      state: notification.state,
      formattedDate15DaysFromNow: notification.formattedDate15DaysFromNow,
      formattedDate20DaysFromNow: notification.formattedDate20DaysFromNow,
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
  
      await addDoc(collection(txtdb, `userNotifications/${userId}/read`), readNotificationData);
      console.log("Notification marked as read and moved to read notifications");
      await handleDeleteNotification(notification.id);
      setShowPopup(false);
      
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setShowPopup(false);

    }
  };

  //pop up

  

  return (
    <div>

      <UserNav />

      <div  className="notification-page">

        <div className="notification-container page">

        <h1>Notifications</h1>

        {notifications.length > 0 ? (
          <p className="recent"><span></span>New<span></span></p>
        ) : ('')}

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
                    <h4>Your order with ID: {notification.orderRefId} has been confirmed </h4>
                    <p>Expected delivery for this item to {notification.state} is between {notification.formattedDate15DaysFromNow} and {notification.formattedDate20DaysFromNow}</p>
                    <p>Please note that delivery fees are paid for seperately</p>
                    <p>Use the live chat feature to inquire shipping fees</p>
                    <h5>To track your order please contact Evanis Interiors via Email</h5>
                    <span>

                    <p className="date">{notification.timestamp}</p> <button onClick={() => handleMarkNotificationAsRead(notification)}>Mark as Read</button>
                    
                    </span>
                </div>

              </div>
              
            ))}
            </div>
        )}

        </div>

        {readNotifications.length > 0 ? (
          <p className="recent"><span></span>Older<span></span></p>

        ) : ('')}

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
                    <h4>Your order with ID: {readNotification.orderRefId} has been confirmed </h4>
                    <p>Expected delivery for this item to {readNotification.state} is between {readNotification.formattedDate15DaysFromNow} and {readNotification.formattedDate20DaysFromNow}</p>
                    <p>Please note that delivery fees are paid for seperately. </p>
                    <p>Use the live chat feature to inquire shipping fees</p>
                    <h5>To track your order please contact Evanis Interiors via Email</h5>
                    <span>

                    <p className="date">{readNotification.timestamp}</p> <button>Read</button>
                    
                    </span>
                </div>

              </div>
              
            ))}
            </div>
        )}

        </div>

        {notifications.length === 0 && readNotifications.length === 0 && (
          <p className="no-notifications">Your notifications will show here</p>
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

export default UserNotifications;
