import React, { useState, useEffect } from 'react';
import flagsmith from 'flagsmith';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingVariant, setBookingVariant] = useState('detailed');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Sample doctors data
  const doctors = [
    { id: 1, name: 'Sarah Johnson', specialty: 'Family Medicine', fee: 150 },
    { id: 2, name: 'Michael Chen', specialty: 'Internal Medicine', fee: 175 },
    { id: 3, name: 'Emily Rodriguez', specialty: 'Dermatology', fee: 200 }
  ];

  useEffect(() => {
    // Initialize Flagsmith - REPLACE with your actual environment key
    flagsmith.init({
      environmentID: 'ser.***', // Replace with your key
      onChange: (oldFlags, params) => {
        const variant = flagsmith.getValue('booking_flow_variant') || 'detailed';
        setBookingVariant(variant);
        
        // Track variant exposure in Google Analytics
        if (window.gtag) {
          window.gtag('event', 'variant_exposure', {
            event_category: 'Feature Flag',
            event_label: 'booking_flow_variant',
            variant: variant
          });
        }
      }
    });

    setIsLoading(false);
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    
    // Track doctor selection
    if (window.gtag) {
      window.gtag('event', 'doctor_selected', {
        event_category: 'User Interaction',
        doctor_id: doctor.id,
        doctor_name: doctor.name,
        variant: bookingVariant
      });
    }
  };

  const handleBookingComplete = () => {
    setBookingComplete(true);
    setSelectedDoctor(null);
    
    // Track successful booking
    if (window.gtag) {
      window.gtag('event', 'appointment_booked', {
        event_category: 'Conversion',
        variant: bookingVariant,
        doctor_id: selectedDoctor?.id,
        value: selectedDoctor?.fee
      });
    }
  };

  if (isLoading) {
    return <div className="loading">Loading Flagsmith...</div>;
  }

  if (bookingComplete) {
    return (
      <div className="app">
        <div className="success">
          <h1>🎉 Appointment Booked!</h1>
          <p>Your appointment has been successfully scheduled.</p>
          <p><strong>Booking Method:</strong> {bookingVariant === 'streamlined' ? 'Quick Booking' : 'Detailed Intake'}</p>
          <button onClick={() => setBookingComplete(false)}>Book Another</button>
        </div>
      </div>
    );
  }

  if (selectedDoctor) {
    return (
      <div className="app">
        <header>
          <button onClick={() => setSelectedDoctor(null)}>← Back</button>
          <h1>Book Appointment</h1>
          <div className="variant-badge">
            {bookingVariant === 'streamlined' ? '⚡ Quick Flow' : '📋 Detailed Flow'}
          </div>
        </header>

        <div className="booking-form">
          <div className="doctor-info">
            <h2>Dr. {selectedDoctor.name}</h2>
            <p>{selectedDoctor.specialty}</p>
            <p className="fee">${selectedDoctor.fee}</p>
          </div>

          {bookingVariant === 'streamlined' ? (
            <StreamlinedBooking onComplete={handleBookingComplete} />
          ) : (
            <DetailedBooking onComplete={handleBookingComplete} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🏥 TeleHealth Booking Demo</h1>
        <p>Flagsmith + Google Analytics Integration</p>
        <div className="variant-badge">
          Active Variant: {bookingVariant === 'streamlined' ? '⚡ Streamlined' : '📋 Detailed'}
        </div>
      </header>

      <main>
        <h2>Available Doctors</h2>
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <h3>Dr. {doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p className="fee">${doctor.fee}</p>
              <button 
                className={`book-btn ${bookingVariant}`}
                onClick={() => handleDoctorSelect(doctor)}
              >
                {bookingVariant === 'streamlined' ? '🚀 Quick Book' : '📅 Book Appointment'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Streamlined Booking Component - Optimized for Speed
function StreamlinedBooking({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Track form submission
    if (window.gtag) {
      window.gtag('event', 'booking_form_submitted', {
        event_category: 'Form',
        variant: 'streamlined',
        form_fields: 4
      });
    }
    
    setTimeout(onComplete, 1000); // Simulate API call
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form streamlined">
      <h3>⚡ Quick Booking (4 fields)</h3>
      
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
        required
      />
      
      <select
        value={formData.time}
        onChange={(e) => setFormData({...formData, time: e.target.value})}
        required
      >
        <option value="">Select Time</option>
        <option value="09:00">9:00 AM</option>
        <option value="14:00">2:00 PM</option>
        <option value="16:00">4:00 PM</option>
      </select>
      
      <button type="submit" className="submit-btn streamlined">
        🚀 Book Now
      </button>
    </form>
  );
}

// Detailed Booking Component - Optimized for Data Quality
function DetailedBooking({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    medical: '',
    emergency: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Track form submission
    if (window.gtag) {
      window.gtag('event', 'booking_form_submitted', {
        event_category: 'Form',
        variant: 'detailed',
        form_fields: 10
      });
    }
    
    setTimeout(onComplete, 1500); // Simulate longer API call
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form detailed">
      <h3>📋 Complete Medical Intake</h3>
      
      <div className="form-section">
        <h4>Personal Information</h4>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={(e) => setFormData({...formData, dob: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>

      <div className="form-section">
        <h4>Medical Information</h4>
        <textarea
          placeholder="Medical History"
          value={formData.medical}
          onChange={(e) => setFormData({...formData, medical: e.target.value})}
        />
        <input
          type="text"
          placeholder="Emergency Contact"
          value={formData.emergency}
          onChange={(e) => setFormData({...formData, emergency: e.target.value})}
          required
        />
      </div>

      <div className="form-section">
        <h4>Appointment Details</h4>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
        <select
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          required
        >
          <option value="">Select Time</option>
          <option value="09:00">9:00 AM</option>
          <option value="14:00">2:00 PM</option>
          <option value="16:00">4:00 PM</option>
        </select>
        <textarea
          placeholder="Reason for visit"
          value={formData.reason}
          onChange={(e) => setFormData({...formData, reason: e.target.value})}
          required
        />
      </div>
      
      <button type="submit" className="submit-btn detailed">
        📅 Complete Booking
      </button>
    </form>
  );
}

export default App;