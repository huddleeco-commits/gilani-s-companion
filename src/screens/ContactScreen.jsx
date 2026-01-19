import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BUSINESS_NAME = "Gilani's";

const BUSINESS_INFO = {
  phone: '(214) 555-0123',
  email: 'reservations@gilanis.com',
  address: '2847 Oak Lawn Ave, Dallas, TX 75219',
  hours: [
    { days: 'Monday - Thursday', time: '5:00 PM - 10:00 PM' },
    { days: 'Friday - Saturday', time: '5:00 PM - 11:00 PM' },
    { days: 'Sunday', time: '4:00 PM - 9:00 PM' },
  ],
  mapUrl: 'https://maps.google.com/?q=2847+Oak+Lawn+Ave+Dallas+TX'
};

export function ContactScreen() {
  const navigate = useNavigate();

  const handleCall = () => {
    window.location.href = `tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${BUSINESS_INFO.email}`;
  };

  const handleDirections = () => {
    window.open(BUSINESS_INFO.mapUrl, '_blank');
  };

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
        <h1 className="screen-title">Contact {BUSINESS_NAME}</h1>
        <p className="screen-subtitle">We'd love to hear from you</p>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={handleCall}
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Phone size={28} color="#C9A961" style={{ marginBottom: '8px' }} />
          <span style={{ fontWeight: '600' }}>Call Us</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
            {BUSINESS_INFO.phone}
          </span>
        </button>

        <button
          onClick={handleEmail}
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Mail size={28} color="#722F37" style={{ marginBottom: '8px' }} />
          <span style={{ fontWeight: '600' }}>Email</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
            Send a message
          </span>
        </button>
      </div>

      {/* Location */}
      <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.6)' }}>
        LOCATION
      </h3>
      <div
        className="card"
        style={{ marginBottom: '24px', padding: '16px', cursor: 'pointer' }}
        onClick={handleDirections}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <MapPin size={20} color="#722F37" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>{BUSINESS_NAME}</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{BUSINESS_INFO.address}</div>
          </div>
          <ExternalLink size={18} color="rgba(255,255,255,0.4)" />
        </div>
      </div>

      {/* Hours */}
      <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.6)' }}>
        HOURS
      </h3>
      <div className="card" style={{ padding: '16px' }}>
        {BUSINESS_INFO.hours.map((schedule, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: idx < BUSINESS_INFO.hours.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock size={16} color="rgba(255,255,255,0.4)" />
              <span style={{ fontWeight: '500' }}>{schedule.days}</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{schedule.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
