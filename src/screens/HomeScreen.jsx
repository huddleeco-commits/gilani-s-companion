import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Calendar, Book, Gift, Phone, ShoppingBag } from 'lucide-react';
import { BUSINESS_NAME } from '../data/menu';

export function HomeScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    { icon: <ShoppingBag size={28} />, label: 'Order Online', route: '/order', color: '#C9A961' },
    { icon: <Calendar size={28} />, label: 'Reservations', route: '/reservations', color: '#722F37' },
    { icon: <Book size={28} />, label: 'Menu', route: '/menu', color: '#C9A961' },
    { icon: <Gift size={28} />, label: 'Rewards', route: '/loyalty', color: '#722F37' },
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

      {/* Contact Quick Link */}
      <button
        onClick={() => navigate('/contact')}
        style={{
          width: '100%',
          marginTop: '16px',
          padding: '16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        <Phone size={18} color="rgba(255,255,255,0.6)" />
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Contact Us</span>
      </button>

      {/* Recent Activity */}
      <h3 style={{ margin: '24px 0 16px', fontSize: '16px', fontWeight: '600' }}>Recent Activity</h3>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontWeight: '500' }}>Dinner Reservation</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Jan 15, 2026 • 7:00 PM</div>
          </div>
          <div style={{ color: '#C9A961', fontSize: '14px' }}>+150 pts</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <div>
            <div style={{ fontWeight: '500' }}>Ribeye Steak Order</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Jan 10, 2026 • $89.00</div>
          </div>
          <div style={{ color: '#C9A961', fontSize: '14px' }}>+89 pts</div>
        </div>
      </div>
    </div>
  );
}
