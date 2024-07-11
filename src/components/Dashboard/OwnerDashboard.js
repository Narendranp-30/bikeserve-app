import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaCheckCircle, FaTruck, FaCheck } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/OwnerDashboard.css';

const OwnerDashboard = ({ user, onLogout }) => {
  const [ownerName, setOwnerName] = useState('');
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
        setFilteredServices(response.data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/defaultCredentials');
        const ownerDetails = response.data.find((cred) => cred.email === user.email);
        if (ownerDetails) {
          setOwnerName(ownerDetails.email);
          fetchServicesByServiceCenter(ownerDetails.serviceCenter);
        }
      } catch (error) {
        console.error('Error fetching owner details:', error);
      }
    };

    fetchOwnerDetails();
  }, [user]);

  const fetchServicesByServiceCenter = async (selectedServiceCenter) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          serviceCenter: selectedServiceCenter,
        },
      });

      const services = response.data;
      setServices(services);
      setFilteredServices(services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    if (e.target.value === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) => service.district === e.target.value);
      setFilteredServices(filtered);
    }
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
  };

  const handleSave = async (updatedService) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/services/${updatedService._id}`, updatedService);
      const updatedIndex = services.findIndex((service) => service._id === updatedService._id);
      if (updatedIndex !== -1) {
        const updatedServices = [...services];
        updatedServices[updatedIndex] = response.data;
        setServices(updatedServices);
        setFilteredServices(updatedServices);
        setSelectedService(null);
      }
    } catch (error) {
      console.error('Error updating service', error);
    }
  };

  const handleDeleteClick = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${serviceId}`);
      setServices(services.filter((service) => service._id !== serviceId));
      setFilteredServices(filteredServices.filter((service) => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service', error);
    }
  };

  const handleTakeServiceClick = async (service) => {
    toast.success("please wait");
    try {
      const updatedService = { ...service, status: 'approved' };
      const response = await axios.put(`http://localhost:5000/api/services/${service._id}`, updatedService);

      await axios.post('http://localhost:5000/api/services/sendEmail', {
        customerEmail: service.email,
        serviceDetails: service,
      });

      console.log('Email sent successfully:', response.data);
      toast.success('Email sent successfully');

      const updatedServices = services.map((s) =>
        s._id === service._id ? { ...s, status: 'approved' } : s
      );
      setServices(updatedServices);
      setFilteredServices(updatedServices);
    } catch (error) {
      console.error('Error taking service:', error);
    }
  };

  const handleTakeServiceClick1 = async (service) => {
    toast.success("please wait");
    try {
      const updatedService = { ...service, status: 'Out for delivery' };
      const response = await axios.put(`http://localhost:5000/api/services/${service._id}`, updatedService);

      await axios.post('http://localhost:5000/api/services/sendEmail', {
        customerEmail: service.email,
        serviceDetails: service,
        status: service.status,
      });

      console.log('Email sent successfully:', response.data);
      toast.success('Email sent successfully');

      const updatedServices = services.map((s) =>
        s._id === service._id ? { ...s, status: 'Out for delivery' } : s
      );
      setServices(updatedServices);
      setFilteredServices(updatedServices);
    } catch (error) {
      console.error('Error taking service:', error);
    }
  };

  const handleTakeServiceClick2 = async (service) => {
    toast.success("please wait");
    try {
      const updatedService = { ...service, status: 'Completed' };
      const response = await axios.put(`http://localhost:5000/api/services/${service._id}`, updatedService);

      await axios.post('http://localhost:5000/api/services/sendEmail', {
        customerEmail: service.email,
        serviceDetails: service,
        status: service.status,
      });

      console.log('Email sent successfully:', response.data);
      toast.success('Email sent successfully');

      const updatedServices = services.map((s) =>
        s._id === service._id ? { ...s, status: 'Completed' } : s
      );
      setServices(updatedServices);
      setFilteredServices(updatedServices);
    } catch (error) {
      console.error('Error taking service:', error);
    }
  };

  const uniqueDistricts = [...new Set(services.map(service => service.district)), "Erode"];

  return (
    <>
      <div className="filter-container">
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="filter-dropdown"
        >
          <option value="">All Districts</option>
          {uniqueDistricts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className="owner-dashboard-container">
        <h2>All Service Informations</h2>
        <div className="owner-dashboard-card-grid">
          {filteredServices.map((service) => (
            <div className="owner-dashboard-card" key={service._id}>
              {selectedService && selectedService._id === service._id ? (
                <div className="owner-dashboard-card-content">
                  <h3 className="owner-dashboard-card-title">Customer Name:</h3>
                  <input
                    type="text"
                    value={selectedService.name}
                    onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Email:</h3>
                  <input
                    type="text"
                    value={selectedService.email}
                    onChange={(e) => setSelectedService({ ...selectedService, email: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Phone:</h3>
                  <input
                    type="text"
                    value={selectedService.phone}
                    onChange={(e) => setSelectedService({ ...selectedService, phone: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Service Type:</h3>
                  <input
                    type="text"
                    value={selectedService.serviceType}
                    onChange={(e) => setSelectedService({ ...selectedService, serviceType: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Bike Type:</h3>
                  <input
                    type="text"
                    value={selectedService.bikeType}
                    onChange={(e) => setSelectedService({ ...selectedService, bikeType: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Complaints:</h3>
                  <input
                    type="text"
                    value={selectedService.complaints}
                    onChange={(e) => setSelectedService({ ...selectedService, complaints: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Service Date:</h3>
                  <input
                    type="text"
                    value={selectedService.serviceDate}
                    onChange={(e) => setSelectedService({ ...selectedService, serviceDate: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">District:</h3>
                  <input
                    type="text"
                    value={selectedService.district}
                    onChange={(e) => setSelectedService({ ...selectedService, district: e.target.value })}
                  />
                  <h3 className="owner-dashboard-card-title">Service Center:</h3>
                  <input
                    type="text"
                    value={selectedService.serviceCenter}
                    onChange={(e) => setSelectedService({ ...selectedService, serviceCenter: e.target.value })}
                  />
                  <div className="owner-dashboard-card-buttons">
                    <button className="owner-dashboard-card-button save" onClick={() => handleSave(selectedService)}>Save</button>
                    <button className="owner-dashboard-card-button cancel" onClick={() => setSelectedService(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="owner-dashboard-card-content">
                  <h3 className="owner-dashboard-card-title">Customer Name: {service.name}</h3>
                  <p className="owner-dashboard-card-detail">Email: {service.email}</p>
                  <p className="owner-dashboard-card-detail">Phone: {service.phone}</p>
                  <p className="owner-dashboard-card-detail">Service Type: {service.serviceType}</p>
                  <p className="owner-dashboard-card-detail">Bike Type: {service.bikeType}</p>
                  <p className="owner-dashboard-card-detail">Complaints: {service.complaints}</p>
                  <p className="owner-dashboard-card-detail">Service Date: {service.serviceDate}</p>
                  <p className="owner-dashboard-card-detail">District: {service.district}</p>
                  <p className="owner-dashboard-card-detail">Service Center: {service.serviceCenter}</p>
                  <p className="owner-dashboard-card-detail">Status: {service.status}</p>
                  <div className="owner-dashboard-card-buttons">
                    <FaEdit className="owner-dashboard-card-icon" onClick={() => handleEditClick(service)} size={24} />
                    <FaTrash className="owner-dashboard-card-icon" onClick={() => handleDeleteClick(service._id)} size={24} />
                    {service.status === 'Pending' && (
                      <FaCheckCircle className="owner-dashboard-card-icon take-service" onClick={() => handleTakeServiceClick(service)} size={24} />
                    )}
                    {service.status === 'approved' && (
                      <FaTruck className="owner-dashboard-card-icon take-service" onClick={() => handleTakeServiceClick1(service)} size={24} />
                    )}
                    {service.status === 'Out for delivery' && (
                      <FaCheck className="owner-dashboard-card-icon take-service" onClick={() => handleTakeServiceClick2(service)} size={24} />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;
