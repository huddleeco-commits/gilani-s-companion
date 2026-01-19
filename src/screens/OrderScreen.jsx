import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingBag, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MENU_DATA, BUSINESS_NAME } from '../data/menu';

export function OrderScreen() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeFromCart = (item) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[item.id] > 1) {
        newCart[item.id]--;
      } else {
        delete newCart[item.id];
      }
      return newCart;
    });
  };

  const getCartCount = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const getCartTotal = () => {
    let total = 0;
    MENU_DATA.categories.forEach(cat => {
      cat.items.forEach(item => {
        if (cart[item.id]) {
          total += item.price * cart[item.id];
        }
      });
    });
    return total;
  };

  const getCartItems = () => {
    const items = [];
    MENU_DATA.categories.forEach(cat => {
      cat.items.forEach(item => {
        if (cart[item.id]) {
          items.push({ ...item, qty: cart[item.id] });
        }
      });
    });
    return items;
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    const pointsEarned = Math.floor(getCartTotal());
    return (
      <div className="screen">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Check size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Order Placed!</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
            Your order from {BUSINESS_NAME} is being prepared
          </p>
          <div className="card" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>ORDER SUMMARY</h4>
            {getCartItems().map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span>{item.qty}x {item.name}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: '600', fontSize: '18px' }}>
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <p style={{ color: '#10b981', fontSize: '16px', fontWeight: '600', marginBottom: '32px' }}>
            +{pointsEarned} loyalty points earned!
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ paddingBottom: getCartCount() > 0 ? '140px' : '20px' }}>
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
        <h1 className="screen-title">Order Online</h1>
        <p className="screen-subtitle">from {BUSINESS_NAME}</p>
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
                <span style={{ fontWeight: '600', color: '#10b981', fontSize: '16px', display: 'block', marginTop: '8px' }}>
                  ${item.price}
                </span>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {cart[item.id] > 0 ? (
                  <>
                    <button
                      onClick={() => removeFromCart(item)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'transparent', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{cart[item.id]}</span>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: 'none', background: '#8b5cf6', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      padding: '8px 16px', borderRadius: '20px',
                      border: 'none', background: '#8b5cf6', color: 'white',
                      fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    <Plus size={16} /> Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      {getCartCount() > 0 && (
        <div style={{
          position: 'fixed', bottom: '80px', left: '0', right: '0',
          padding: '16px 20px',
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white', fontSize: '16px', fontWeight: '600',
              border: 'none', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
            }}
          >
            <ShoppingBag size={20} />
            Place Order • ${getCartTotal().toFixed(2)}
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '2px 8px', borderRadius: '10px',
              fontSize: '14px'
            }}>
              {getCartCount()} items
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
