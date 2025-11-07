import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Buat context secara named export
export const AuthContext = createContext(null);

// Konfigurasi axios global
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Komponen penyedia context
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interceptor untuk Authorization otomatis
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          delete axios.defaults.headers.common["Authorization"];
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Load user session saat mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  // Fungsi login
  async function login(email, password) {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/login", { email, password });

      // backend mengirim {token, user, message}
      const { token, user: userData, message } = response.data;
      if (!token || !userData) {
        return {
          success: false,
          message: message || "Login gagal. Data tidak ditemukan.",
        };
      }

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
      return { success: true };
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        "Login gagal. Periksa email dan password Anda.";
      return {
        success: false,
        message: backendMessage,
      };
    }
  }

  // Fungsi logout
  async function logout() {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios.post("/api/logout");
      }
    } catch {
      // Tetap bersihkan session walaupun error
    } finally {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook untuk akses auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
