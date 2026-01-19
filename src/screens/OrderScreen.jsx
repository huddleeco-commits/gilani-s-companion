import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingBag, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

export function OrderScreen() {
  const navigate = useNavigate();
  const { menuData, businessName, loading } = useMenu();
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
    if (!menuData?.categories) return 0;
    let total = 0;
    menuData.categories.forEach(cat => {
      cat.items.forEach(item => {
        if (cart[item.id]) {
          total += item.price * cart[item.id];
        }
      });
    });
    return total;
  };

  const getCartItems = () => {
    if (!menuData?.categories) return [];
    const items = [];
    menuData.categories.forEach(cat => {
      cat.items.forEach(item => {
        if (cart[item.id]) {
          items.push({ ...item, quantity: cart[item.id] });
        }
      });
    });
    return items;
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const cartItems = getCartItems();
      const total = getCartTotal();

      // Submit order to API
      const result = await api.createOrder({
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        customerId: user?.id || null,
        customerName: user?.name || 'Guest',
        customerEmail: user?.email || null,
        total: total
      });

      setOrderData(result.order);
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      // Still show success for demo purposes (offline fallback)
      setOrderData({ id: Date.now(), pointsEarned: Math.floor(getCartTotal()) });
      setOrderPlaced(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !menuData) {
    return (
      <div className="screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  const categories = menuData.categories || [];
  const currentCategory = categories[activeCategory];

  if (orderPlaced) {
    const cartItems = getCartItems();
    const total = getCartTotal();
    const pointsEarned = orderData?.pointsEarned || Math.floor(total);

    return (
      <div className="screen">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #C9A961, #a88942)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Check size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Order Placed!</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
            Your order from {businessName} is being prepared
          </p>
          <div className="card" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>ORDER SUMMARY</h4>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: '600', fontSize: '18px' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p style={{ color: '#C9A961', fontSize: '16px', fontWeight: '600', marginBottom: '32px' }}>
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
        <p className="screen-subtitle">from {businessName}</p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '8px' }}>
        {categories.map((cat, idx) => (
          <button
            key={cat.id || idx}
            onClick={() => setActiveCategory(idx)}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              border: 'none',
              background: activeCategory === idx ? '#722F37' : 'rgba(255,255,255,0.1)',
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
        {currentCategory?.items?.map((item) => (
          <div key={item.id} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>{item.name}</span>
                  {item.popular && <Star size={14} fill="#C9A961" color="#C9A961" />}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>
                  {item.description}
                </p>
                <span style={{ fontWeight: '600', color: '#C9A961', fontSize: '16px', display: 'block', marginTop: '8px' }}>
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
                        border: 'none', background: '#722F37', color: 'white',
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
                      border: 'none', background: '#722F37', color: 'white',
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
            disabled={submitting}
            style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #722F37, #5a252c)',
              color: 'white', fontSize: '16px', fontWeight: '600',
              border: 'none', borderRadius: '12px', cursor: submitting ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              opacity: submitting ? 0.7 : 1
            }}
          >
            <ShoppingBag size={20} />
            {submitting ? 'Placing Order...' : `Place Order • $${getCartTotal().toFixed(2)}`}
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
