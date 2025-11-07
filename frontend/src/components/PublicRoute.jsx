import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#2c342f]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#9bada4] mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Jika sudah login, redirect ke dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika belum login, tampilkan halaman (Login)
  return children;
}
