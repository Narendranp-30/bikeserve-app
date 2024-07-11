import axios from 'axios';

const API_URL = 'http://localhost:5000/api/services';

const getAllServices = async () => {
  return await axios.get(API_URL);
};

const createService = async (serviceData) => {
  return await axios.post(API_URL, serviceData);
};

const updateService = async (id, serviceData) => {
  return await axios.put(`${API_URL}/${id}`, serviceData);
};

const deleteService = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

const serviceService = { getAllServices, createService, updateService, deleteService };
export default serviceService;
