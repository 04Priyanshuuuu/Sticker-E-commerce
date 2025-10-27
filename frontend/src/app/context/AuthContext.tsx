"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Helper function: refresh access token if expired
  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/refresh/", {
        method: "POST",
        credentials: "include",
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  // ✅ Fetch current user profile
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/profile/", {
        credentials: "include",
      });

      if (res.status === 401) {
        // Access token expired — try refresh
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const retryRes = await fetch("http://localhost:8000/api/auth/profile/", {
            credentials: "include",
          });
          if (retryRes.ok) {
            const data = await retryRes.json();
            setUser(data);
            return;
          }
        }
        // Refresh failed — clear user
        setUser(null);
      } else if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Logout handler
  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
