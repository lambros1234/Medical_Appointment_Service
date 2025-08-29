import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token, send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is set, check role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // redirect to home if role is not allowed
  }

  return children;
}
