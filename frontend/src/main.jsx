import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Tambahkan konfigurasi Axios global di sini jika pakai axios untuk API
// Ini memastikan semua endpoint API Laravel backend yang butuh session/cookie/credentials akan otomatis terhandle
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true; // WAJIB supaya session/cookie dikirim setiap request

// Jika pakai context authentication, wrap dengan AuthProvider
// import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Jika pakai context Auth, uncomment dan wrap di bawah */}
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </StrictMode>
);
