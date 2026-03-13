import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/employee-login" />;
  }

  try {
    // Decoding JWT manually to avoid external dependency issues
    const payload = token.split(".")[1];
    const decodedStr = atob(payload);
    const decoded = JSON.parse(decodedStr);

    // Fallback checking logic just in case it is strictly missing
    if (!decoded || !decoded.user || decoded.user.role !== "employee") {
      console.error("Access denied:", decoded?.user?.role || "no role");
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("JWT decoding error:", error);
    return <Navigate to="/employee-login" />;
  }

  return children;
};

export default ProtectedRoute;
