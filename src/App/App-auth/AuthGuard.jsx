import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase-config";
import { PuffLoader } from "react-spinners";


const ProtectedRoute = ({  children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    // You can return a loading spinner or placeholder here
    return <div className="spinner-container">
          <PuffLoader color=" #888" size={25} />
    </div>;
  }

  if ( !user || error) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
