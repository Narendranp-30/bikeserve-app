import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditServiceModal = ({ service, onClose, onSave }) => {
  const [serviceData, setServiceData] = useState(service);

  useEffect(() => {
    setServiceData(service);
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    console.log('Save button clicked for service data:', serviceData);  // Debug statement
    try {
      const response = await axios.put(`http://localhost:5000/api/services/${serviceData._id}`, serviceData);
      onSave(response.data);
    } catch (error) {
      console.error('Error updating service', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Service</h2>
        <input
          type="text"
          name="name"
          value={serviceData.name || ''}
          onChange={handleChange}
          placeholder="Customer Name"
        />
        <input
          type="text"
          name="email"
          value={serviceData.email || ''}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={serviceData.phone || ''}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="serviceType"
          value={serviceData.serviceType || ''}
          onChange={handleChange}
          placeholder="Service Type"
        />
        <input
          type="text"
          name="bikeType"
          value={serviceData.bikeType || ''}
          onChange={handleChange}
          placeholder="Bike Type"
        />
        <input
          type="text"
          name="complaints"
          value={serviceData.complaints || ''}
          onChange={handleChange}
          placeholder="Complaints"
        />
        <input
          type="text"
          name="serviceDate"
          value={serviceData.serviceDate || ''}
          onChange={handleChange}
          placeholder="Service Date"
        />
        <input
          type="text"
          name="district"
          value={serviceData.district || ''}
          onChange={handleChange}
          placeholder="District"
        />
        <input
          type="text"
          name="serviceCenter"
          value={serviceData.serviceCenter || ''}
          onChange={handleChange}
          placeholder="Service Center"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditServiceModal;
