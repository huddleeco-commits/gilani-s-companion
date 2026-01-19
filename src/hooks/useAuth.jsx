import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

// Demo mode - bypass authentication for testing
const DEMO_MODE = true;
const DEMO_USER = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@gilani-s.com',
  points: 2500,
  tier: 'Gold',
  visits: 12
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DEMO_MODE ? DEMO_USER : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!DEMO_MODE) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await api.getProfile();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (DEMO_MODE) {
      setUser(DEMO_USER);
      return { user: DEMO_USER };
    }
    const data = await api.login(email, password);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    if (DEMO_MODE) {
      // In demo mode, just refresh to "log back in"
      setUser(DEMO_USER);
      return;
    }
    api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
