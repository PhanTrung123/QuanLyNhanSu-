import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">Vui lòng chờ...</div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
