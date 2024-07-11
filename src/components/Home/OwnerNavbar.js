// src/components/Home/OwnerNavbar.js

import React from 'react';
import '../../styles/Navbar.css';

const OwnerNavbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          Bike Service App
        </div>
        <div className="navbar-links">
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavbar;
