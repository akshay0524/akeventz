import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    setUser(data.data.user);
    setToken(data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("token", data.data.token);
  };

  const register = async (userData) => {
    const { data } = await api.post("/auth/register", userData);

    // Auto-login after register
    setUser(data.data.user);
    setToken(data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("token", data.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
