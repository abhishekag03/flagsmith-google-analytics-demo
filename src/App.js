import React, { useState, useEffect } from 'react';
import flagsmith from 'flagsmith';
import './App.css';

// Default configuration fallback
const DEFAULT_CONFIG = {
  name: 'default',
  display_name: '📋 Standard Flow',
  form_title: 'Book Your Appointment',
  button_text: 'Book Appointment',
  button_color: '#667eea',
  button_text_color: '#ffffff',
  submit_text: 'Schedule Appointment',
  submit_delay: 1000,
  form_fields: [
    { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'time', type: 'select', placeholder: 'Select Time', required: true, 
      options: [
        { value: '09:00', label: '9:00 AM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '16:00', label: '4:00 PM' }
      ]
    }
  ]
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingConfig, setBookingConfig] = useState(null);
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
      environmentID: '', // Replace with your key
      onChange: (oldFlags, params) => {
        const configJson = flagsmith.getValue('booking_flow_config') || JSON.stringify(DEFAULT_CONFIG);
        
        try {
          const config = JSON.parse(configJson);
          setBookingConfig(config);
          
          // Track variant exposure with actual config name
          if (window.gtag) {
            window.gtag('event', 'variant_exposure', {
              event_category: 'Feature Flag',
              event_label: 'booking_flow_config',
              variant: config.name
            });
          }
        } catch (error) {
          console.error('Invalid config JSON:', error);
          setBookingConfig(DEFAULT_CONFIG);
        }
      }
    });

    setIsLoading(false);
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    
    // Track doctor selection with config name
    if (window.gtag) {
      window.gtag('event', 'doctor_selected', {
        event_category: 'User Interaction',
        doctor_id: doctor.id,
        doctor_name: doctor.name,
        variant: bookingConfig?.name || 'unknown'
      });
    }
  };

  const handleBookingComplete = () => {
    setBookingComplete(true);
    setSelectedDoctor(null);
    
    // Track successful booking with config name
    if (window.gtag) {
      window.gtag('event', 'appointment_booked', {
        event_category: 'Conversion',
        variant: bookingConfig?.name || 'unknown',
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
          <p><strong>Booking Method:</strong> {bookingConfig?.display_name || 'Standard Flow'}</p>
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
            {bookingConfig?.display_name || 'Loading...'}
          </div>
        </header>

        <div className="booking-form">
          <div className="doctor-info">
            <h2>Dr. {selectedDoctor.name}</h2>
            <p>{selectedDoctor.specialty}</p>
            <p className="fee">${selectedDoctor.fee}</p>
          </div>

          <DynamicBookingForm 
            config={bookingConfig}
            onComplete={handleBookingComplete} 
          />
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
          Active Variant: {bookingConfig?.display_name || 'Loading...'}
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
                className="book-btn"
                style={{
                  backgroundColor: bookingConfig?.button_color || '#667eea',
                  color: bookingConfig?.button_text_color || '#ffffff'
                }}
                onClick={() => handleDoctorSelect(doctor)}
              >
                {bookingConfig?.button_text || 'Book Appointment'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Dynamic booking form component - completely configuration-driven
function DynamicBookingForm({ config, onComplete }) {
  const [formData, setFormData] = useState({});
  
  if (!config) return <div>Loading form...</div>;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Track form submission with config details
    if (window.gtag) {
      window.gtag('event', 'booking_form_submitted', {
        event_category: 'Form',
        variant: config.name,
        form_fields: config.form_fields?.length || 0
      });
    }
    
    setTimeout(onComplete, config.submit_delay || 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form dynamic">
      <h3>{config.form_title}</h3>
      
      {/* Show testimonials if configured */}
      {config.show_testimonials && (
        <div className="testimonials">
          <p>⭐⭐⭐⭐⭐ "Amazing service!" - Sarah M.</p>
        </div>
      )}
      
      {/* Show guarantee if configured */}
      {config.show_guarantee && (
        <div className="guarantee">
          🛡️ {config.show_guarantee}
        </div>
      )}
      
      {/* Show social proof if configured */}
      {config.show_social_proof && (
        <div className="social-proof">
          👥 {config.show_social_proof}
        </div>
      )}
      
      {/* Show countdown if configured */}
      {config.show_countdown && (
        <div className="countdown">
          ⏰ Limited time offer!
        </div>
      )}
      
      {/* Dynamic form fields */}
      {config.form_fields?.map(field => (
        <DynamicField 
          key={field.name}
          field={field}
          value={formData[field.name] || ''}
          onChange={(value) => setFormData({...formData, [field.name]: value})}
        />
      ))}
      
      {/* Show discount banner if configured */}
      {config.discount_banner && (
        <div className="discount-banner">
          💰 {config.discount_banner}
        </div>
      )}
      
      <button 
        type="submit" 
        className="submit-btn dynamic"
        style={{ 
          backgroundColor: config.button_color || '#667eea',
          color: config.button_text_color || '#ffffff',
          animation: config.button_animation || 'none'
        }}
      >
        {config.submit_text || 'Submit'}
      </button>
    </form>
  );
}

// Dynamic field component that renders different input types
function DynamicField({ field, value, onChange }) {
  const baseProps = {
    value,
    onChange: (e) => onChange(e.target.value),
    required: field.required,
    placeholder: field.placeholder
  };

  switch (field.type) {
    case 'text':
      return (
        <div className="form-field">
          <input type="text" {...baseProps} />
        </div>
      );
    
    case 'email':
      return (
        <div className="form-field">
          <input type="email" {...baseProps} />
        </div>
      );
    
    case 'tel':
      return (
        <div className="form-field">
          <input type="tel" {...baseProps} />
        </div>
      );
    
    case 'date':
      return (
        <div className="form-field">
          <input 
            type="date" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      );
    
    case 'textarea':
      return (
        <div className="form-field">
          <textarea 
            {...baseProps}
            rows={field.rows || 3}
          />
        </div>
      );
    
    case 'select':
      return (
        <div className="form-field">
          <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    
    default:
      return (
        <div className="form-field">
          <input type="text" {...baseProps} />
        </div>
      );
  }
}

export default App;

