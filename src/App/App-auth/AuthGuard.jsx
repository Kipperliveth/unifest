import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase-config";

const ProtectedRoute = ({  children }) => {
  const [user, loading, error] = useAuthState(auth);
  if (loading || !user || error) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
