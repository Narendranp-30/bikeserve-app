// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (email, password, username) => {
  const response = await axios.post(`${API_URL}/register`, { email, password, username });
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
