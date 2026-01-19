import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

// Default guest user when not logged in
const GUEST_USER = {
  id: null,
  name: 'Guest',
  email: null,
  points: 0,
  tier: 'Bronze',
  visits: 0
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      // No token - use guest user
      setUser(GUEST_USER);
      setLoading(false);
      return;
    }

    try {
      const data = await api.getProfile();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(GUEST_USER);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(GUEST_USER);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      if (data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await api.post('/api/auth/register', { name, email, password });
      if (data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    api.logout();
    setUser(GUEST_USER);
  };

  const isAuthenticated = user && user.id !== null;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
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
