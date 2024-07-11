import React, { useState, useEffect } from 'react';
import serviceService from '../../services/serviceService';
import bookingService from '../../services/bookingService';

const BookingForm = () => {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAllServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookingService.bookService({ serviceId, date });
      // Redirect or show success message
    } catch (error) {
      // Handle booking error
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Book Service</button>
      </form>
    </div>
  );
};

export default BookingForm;
