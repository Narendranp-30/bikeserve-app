import React from 'react';
import BookingDetails from '../components/Bookings/BookingDetails';

const BookingDetailsPage = ({ match }) => {
  return (
    <div className="booking-details-page">
      <BookingDetails bookingId={match.params.id} />
    </div>
  );
};

export default BookingDetailsPage;
