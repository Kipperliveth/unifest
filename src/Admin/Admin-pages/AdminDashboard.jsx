import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "../../App/App-components/UserNav";

function AdminDashboard() {
  return (
    <div>
      this is the AdminDashboard
      <NavLink to="/store">Go to shop</NavLink>
    </div>
  );
}

export default AdminDashboard;
