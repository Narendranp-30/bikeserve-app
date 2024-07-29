import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Illustration from './login.gif'
import '../../styles/Register.css'; // Adjust the path based on your project structure

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{6,}$/;
    return re.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
   
    return re.test(String(phoneNumber));
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters longand  add some special characters and one letter should caps');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Phone number must be 10 digits long');
      return;
    }
    // const re = /^[5-9]\d{9}$/;

    //return password.length >= 6;
    const role = 'user'; // Set default role to 'customer'

    try {
      await axios.post('http://localhost:5000/auth/register', { email, password, role, phoneNumber });
      
      navigate('/login');
    } catch (error) {
      console.error('Error registering user', error);
      setError('Error registering user. Please try again later.');
    }
  };

  return (
    <div className="container-fluid register-container">
      <div className="row h-100">
        <div className="col-md-6 illustration d-flex align-items-center justify-content-center">
          <img src={Illustration} alt="Illustration" />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center form-wrapper">
          <h2>Register</h2>
          <form onSubmit={handleRegister} className="w-75">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Register</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
