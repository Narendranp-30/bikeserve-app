import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'; // Custom styles

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const user = await onLogin(email, password);
      console.log(user);
      navigate('/customer-dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row h-100">
        <div className="col-md-6 illustration d-flex align-items-center justify-content-center">
          <img src="/login.gif" alt="Illustration" />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center form-wrapper">
          <h2>Already Members</h2>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
          <p className="mt-3">Don't have an account yet? <a href="/register">Create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
