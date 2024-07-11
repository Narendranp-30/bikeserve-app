import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

const bookService = async (bookingData) => {
  return await axios.post(API_URL, bookingData);
};

const getAllBookings = async () => {
  return await axios.get(API_URL);
};

const getBookingById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

const updateBookingStatus = async (id, status) => {
  return await axios.put(`${API_URL}/${id}/status`, { status });
};

const bookingService = { bookService, getAllBookings, getBookingById, updateBookingStatus };
export default bookingService;
