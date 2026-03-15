import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = ["employee"] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/employee-login" />;
  }

  try {
    // Decoding JWT manually to avoid external dependency issues
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedStr = atob(normalized);
    const decoded = JSON.parse(decodedStr);
    const role = decoded?.user?.role?.toLowerCase();
    const allowed = allowedRoles.map((r) => r.toLowerCase());

    if (!decoded || !decoded.user || !allowed.includes(role)) {
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
