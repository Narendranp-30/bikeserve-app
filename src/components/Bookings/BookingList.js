import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import BookingItem from './BookingItems';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      {bookings.map((booking) => (
        <BookingItem key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingList;
