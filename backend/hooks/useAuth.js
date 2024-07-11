import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      
      setUser(user);

      if (user.role === 'owner') {
        history.push('/owner-dashboard');
      } else {
        history.push('/customer-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error appropriately
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    history.push('/login');
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error checking auth:', error);
        logout();
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, login, logout };
};

export default useAuth;
