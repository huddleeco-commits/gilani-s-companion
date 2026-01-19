import React, { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MENU_DATA, BUSINESS_NAME } from '../data/menu';

export function MenuScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="screen">
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="screen-header">
        <h1 className="screen-title">{BUSINESS_NAME} Menu</h1>
        <p className="screen-subtitle">Fresh daily selections</p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '8px' }}>
        {MENU_DATA.categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              border: 'none',
              background: activeCategory === idx ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
              color: activeCategory === idx ? 'white' : 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {MENU_DATA.categories[activeCategory].items.map((item) => (
          <div key={item.id} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>{item.name}</span>
                  {item.popular && <Star size={14} fill="#f59e0b" color="#f59e0b" />}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>
                  {item.description}
                </p>
              </div>
              <span style={{ fontWeight: '600', color: '#10b981', fontSize: '16px' }}>
                ${item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Online CTA */}
      <div style={{ marginTop: '24px' }}>
        <button
          onClick={() => navigate('/order')}
          className="btn-primary"
        >
          Order Online
        </button>
      </div>
    </div>
  );
}
