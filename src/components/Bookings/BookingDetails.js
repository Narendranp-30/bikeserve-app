import React from 'react';
import { Link } from 'react-router-dom';

const BookingItem = ({ booking }) => {
  return (
    <div className="booking-item">
      <h3>{booking.service.name}</h3>
      <p>{booking.date}</p>
      <p>Status: {booking.status}</p>
      <Link to={`/booking/${booking._id}`}>View Details</Link>
    </div>
  );
};

export default BookingItem;
