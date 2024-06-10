import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase-config";

const AdminRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const allowedUid = "563S5iR9e2UGKK2v77p2XR7EM643";  // Define the allowed UID here

  if (loading || error || !user || user.uid !== allowedUid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
