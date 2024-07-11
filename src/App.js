import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import OwnerDashboard from './components/Dashboard/OwnerDashboard';
import ServiceList from './components/Services/ServiceList';
import Home from './components/Home/Home';
import Navbar from './components/Home/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import OwnerNavbar from './components/Home/OwnerNavbar'; // Import OwnerNavbar
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const loggedInUser = response.data.user;
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('email', email);
      return loggedInUser;
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Router>
      {user && user.role === 'owner' ? (
        <OwnerNavbar onLogout={handleLogout} />
      ) : (
        <Navbar user={user} onLogout={handleLogout} />
      )}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate to={user.role === 'owner' ? "/owner-dashboard" : "/home"} /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer-dashboard" element={user ? <CustomerDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/owner-dashboard" element={user ? <OwnerDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/services" element={<ServiceList user={user} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer/>
      </div>
    </Router>
  );
};

export default App;
