import React from 'react';
import Navbar from '../Home/Navbar';
import ServiceForm from '../Services/ServiceForm';
import BookingList from '../Bookings/BookingList';
const Dashboard = () => {
  return (
    <div>
      
      <div className="container">
        <h1>Dashboard</h1>
      
        <ServiceForm />
        <BookingList />
      </div>
    </div>
  );
};

export default Dashboard;
