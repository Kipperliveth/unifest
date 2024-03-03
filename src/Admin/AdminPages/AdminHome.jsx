import React from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";

function AdminHome() {
  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminHome-content">
        <h1>Welcome Back Admin</h1>
      </div>
    </div>
  );
}

export default AdminHome;
