import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Calendar, Book, Gift, Phone } from 'lucide-react';

const BUSINESS_NAME = "Gilani's";

export function HomeScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    { icon: <Calendar size={28} />, label: 'Reservations', route: '/reservations', color: '#8b5cf6' },
    { icon: <Book size={28} />, label: 'Menu', route: '/menu', color: '#f59e0b' },
    { icon: <Gift size={28} />, label: 'Loyalty', route: '/loyalty', color: '#10b981' },
    { icon: <Phone size={28} />, label: 'Contact', route: '/contact', color: '#3b82f6' },
  ];

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">Welcome to {BUSINESS_NAME}</h1>
        <p className="screen-subtitle">{user?.name || 'Guest'}</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{user?.points?.toLocaleString() || 0}</div>
          <div className="stat-label">Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user?.tier || 'Bronze'}</div>
          <div className="stat-label">Tier</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user?.visits || 0}</div>
          <div className="stat-label">Visits</div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Quick Actions</h3>
      <div className="quick-actions-grid">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="card"
            onClick={() => navigate(action.route)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform 0.2s',
            }}
          >
            <div style={{ color: action.color, marginBottom: '8px' }}>{action.icon}</div>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <h3 style={{ margin: '24px 0 16px', fontSize: '16px', fontWeight: '600' }}>Recent Activity</h3>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontWeight: '500' }}>Dinner Reservation</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Jan 15, 2026 • 7:00 PM</div>
          </div>
          <div style={{ color: '#10b981', fontSize: '14px' }}>+150 pts</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <div>
            <div style={{ fontWeight: '500' }}>Ribeye Steak Order</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Jan 10, 2026 • $89.00</div>
          </div>
          <div style={{ color: '#10b981', fontSize: '14px' }}>+89 pts</div>
        </div>
      </div>
    </div>
  );
}
