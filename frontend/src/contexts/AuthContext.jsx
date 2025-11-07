import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// 1. Context
const AuthContext = createContext(null);

// 2. Axios instance untuk API
const api = axios.create({
  baseURL: "https://apiv2.alsindata.id",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 3. Provider utama (default export, sesuai best practice Vite/React)
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interceptor Bearer token
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // On mount: cek session user
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  // Fungsi login
  async function login(email, password) {
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/login", { email, password });
      const { token, user: userData, message } = response.data;
      if (!token || !userData)
        return { success: false, message: message || "Login gagal." };
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login gagal",
      };
    }
  }

  // Fungsi logout
  async function logout() {
    try {
      await api.post("/api/logout");
    } catch {}
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom hook (named export)
function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export default AuthProvider;
export { useAuth };
