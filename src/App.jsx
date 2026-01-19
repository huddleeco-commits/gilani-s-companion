import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ReservationsScreen } from './screens/ReservationsScreen';
import { MenuScreen } from './screens/MenuScreen';
import { OrderScreen } from './screens/OrderScreen';
import { ContactScreen } from './screens/ContactScreen';
import { LoyaltyScreen } from './screens/LoyaltyScreen';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        } />
        <Route path="/reservations" element={<ReservationsScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/order" element={<OrderScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/loyalty" element={<LoyaltyScreen />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        } />
      </Routes>
      {user && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
