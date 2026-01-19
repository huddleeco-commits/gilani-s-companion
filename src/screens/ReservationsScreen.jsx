import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BUSINESS_NAME = "Gilani's";

const TIME_SLOTS = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];
const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

export function ReservationsScreen() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [booked, setBooked] = useState(false);
  const [upcomingReservations] = useState([
    { id: 1, date: 'Jan 25, 2026', time: '7:30 PM', party: 4, status: 'confirmed' },
  ]);

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setBooked(true);
    }
  };

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  if (booked) {
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
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Reservation Confirmed!</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
            {BUSINESS_NAME} • {dates.find(d => d.value === selectedDate)?.label}<br />
            {selectedTime} • Party of {partySize}
          </p>
          <p style={{ color: '#C9A961', fontSize: '14px', marginBottom: '32px' }}>
            +150 loyalty points earned!
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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
        <h1 className="screen-title">Book a Table</h1>
        <p className="screen-subtitle">at {BUSINESS_NAME}</p>
      </div>

      {/* Upcoming Reservations */}
      {upcomingReservations.length > 0 && (
        <>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.6)' }}>
            UPCOMING RESERVATIONS
          </h3>
          <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
            {upcomingReservations.map(res => (
              <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{res.date} at {res.time}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Party of {res.party}</div>
                </div>
                <span style={{
                  background: '#C9A961',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* New Reservation */}
      <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.6)' }}>
        NEW RESERVATION
      </h3>

      {/* Party Size */}
      <div className="card" style={{ marginBottom: '16px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Users size={20} color="#722F37" />
          <span style={{ fontWeight: '500' }}>Party Size</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {PARTY_SIZES.map(size => (
            <button
              key={size}
              onClick={() => setPartySize(size)}
              style={{
                width: '44px', height: '44px', borderRadius: '12px',
                border: partySize === size ? '2px solid #722F37' : '1px solid rgba(255,255,255,0.2)',
                background: partySize === size ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: 'white', fontSize: '16px', cursor: 'pointer'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="card" style={{ marginBottom: '16px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Calendar size={20} color="#722F37" />
          <span style={{ fontWeight: '500' }}>Select Date</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {dates.slice(0, 7).map(date => (
            <button
              key={date.value}
              onClick={() => setSelectedDate(date.value)}
              style={{
                padding: '12px 16px', borderRadius: '12px', minWidth: '80px',
                border: selectedDate === date.value ? '2px solid #722F37' : '1px solid rgba(255,255,255,0.2)',
                background: selectedDate === date.value ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: 'white', fontSize: '13px', cursor: 'pointer', textAlign: 'center'
              }}
            >
              {date.label.split(', ')[0]}<br />
              <span style={{ fontSize: '11px', opacity: 0.6 }}>{date.label.split(', ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Clock size={20} color="#722F37" />
          <span style={{ fontWeight: '500' }}>Select Time</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {TIME_SLOTS.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              style={{
                padding: '10px 16px', borderRadius: '12px',
                border: selectedTime === time ? '2px solid #722F37' : '1px solid rgba(255,255,255,0.2)',
                background: selectedTime === time ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: 'white', fontSize: '14px', cursor: 'pointer'
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleBook}
        disabled={!selectedDate || !selectedTime}
        style={{ opacity: (!selectedDate || !selectedTime) ? 0.5 : 1 }}
      >
        Book Reservation
      </button>
    </div>
  );
}
