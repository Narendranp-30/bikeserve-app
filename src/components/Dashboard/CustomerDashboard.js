// src/components/Dashboard/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from '../Services/ServiceForm'; // Updated import
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [/*services*/, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services', error);
    }
  };

  const handleAddService = async (newService) => {
    try {
      const response = await axios.post('http://localhost:5000/api/services', newService);
      console.log('New service added:', response.data);
      fetchServices(); // Refresh services after adding a new one
      navigate('/services'); // Navigate to Service List page
    } catch (error) {
      console.error('Error adding service', error);
    }
  };

  return (
    <div>
      <ServiceForm onSubmit={handleAddService} /> {/* Integrated ServiceForm component */}
      {/* <h2>Services</h2> */}
      {/* <ul>
        {services.map((service) => (
          <li key={service._id}>
            <div>Name: {service.name}</div>
            <div>Email: {service.email}</div>
            <div>Phone: {service.phone}</div>
            <div>Service Type: {service.serviceType}</div>
            <div>Bike Type: {service.bikeType}</div>
            <div>Repaired Parts: {service.repairedParts.map((part) => `${part.name} ($${part.price})`).join(', ')}</div>
            <div>Service Person: {service.servicePerson}</div>
            <div>Complaints: {service.complaints}</div>
            <div>Description: {service.description}</div>
            <div>Price: ${service.price}</div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CustomerDashboard;























//workinh until crud
// // src/components/Dashboard/CustomerDashboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ServiceForm from '../Services/ServiceForm'; // Updated import
// import { useNavigate } from 'react-router-dom';

// const CustomerDashboard = () => {
//   const navigate = useNavigate();
//   const [/*services*/, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error fetching services', error);
//     }
//   };

//   const handleAddService = async (newService) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/services', newService);
//       console.log('New service added:', response.data);
//       fetchServices(); // Refresh services after adding a new one
//       navigate('/services'); // Navigate to Service List page
//     } catch (error) {
//       console.error('Error adding service', error);
//     }
//   };

//   return (
//     <div>
//       <ServiceForm onSubmit={handleAddService} /> {/* Integrated ServiceForm component */}
//       <h2>Services</h2>
//       {/* <ul>
//         {services.map((service) => (
//           <li key={service._id}>
//             <div>Name: {service.name}</div>
//             <div>Email: {service.email}</div>
//             <div>Phone: {service.phone}</div>
//             <div>Service Type: {service.serviceType}</div>
//             <div>Bike Type: {service.bikeType}</div>
//             <div>Repaired Parts: {service.repairedParts.map((part) => `${part.name} ($${part.price})`).join(', ')}</div>
//             <div>Service Person: {service.servicePerson}</div>
//             <div>Complaints: {service.complaints}</div>
//             <div>Description: {service.description}</div>
//             <div>Price: ${service.price}</div>
//           </li>
//         ))}
//       </ul> */}
//     </div>
//   );
// };

// export default CustomerDashboard;


