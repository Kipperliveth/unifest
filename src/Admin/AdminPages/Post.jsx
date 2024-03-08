import React from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";

function Post() {
  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminHome-content adminPost">
        <h1>Make a post</h1>
      </div>
    </div>
  );
}

export default Post;
