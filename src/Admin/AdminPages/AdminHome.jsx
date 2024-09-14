import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { txtdb } from "../../firebase-config";
import AdminDashboard from "../AdminComponents/AdminDashboard";

function AdminHome() {
    const [users, setUsers] = useState([]);
  
    // Fetch users from Firestore
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const userCollection = collection(txtdb, 'tickets'); // Assuming 'users' is your collection name
          const userSnapshot = await getDocs(userCollection);
          const userList = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(userList);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchUsers();
    }, []);


  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content">TIckets</h2>

      <div className="adminHome-content adminContent">
      <h2 className="admin-current-page desktop-content">Tickets</h2>

        {/* <h3>Welcome Back Admin</h3> */}
        <ul className='tix'>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
            <p>TicketID: {user.TicketId}</p>
            <p>Package: {user.package}</p>
            <p>Gender: {user.gender}</p>
            <p>Email: {user.email}</p>
            <p>Admits: {user.quantity}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>

      </div>
    </div>
  );
}

export default AdminHome;
