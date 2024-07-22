import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/ServiceList.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [filterservices, setFilterservices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const filtered = services.filter(item => item.email === localStorage.getItem('email'));
      setFilterservices(filtered);
    }
  }, [services]);

  const handleEdit = (service) => {
    setIsEditing(true);
    setCurrentService(service);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentService || !currentService._id) {
      console.error('Invalid service ID');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/services/${currentService._id}`, currentService);
      console.log('Service updated:', response.data);
      setIsEditing(false);
      setCurrentService(null);
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === response.data._id ? response.data : service
        )
      );
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/services/${id}`);
      console.log('Service deleted:', response.data);
      setServices((prevServices) => prevServices.filter((service) => service._id !== id));
    } catch (error) {
      console.error('Error deleting service', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Approved':
        return 'status-approved';
      case 'Out for delivery':
        return 'status-out-for-delivery';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  useEffect(() => {
    // Dynamically apply status classes to the table rows
    filterservices.forEach(service => {
      const row = document.getElementById(`service-row-${service._id}`);
      if (row) {
        row.className = getStatusClass(service.status);
      }
    });
  }, [filterservices]);

  return (
    <div className="service-list-container bg-dark text-light">
      <div className="container">
        <h2>Service List</h2>
        {isEditing && currentService ? (
          <div className="edit-form">
            <h3>Edit Service</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.name || ''}
                    onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={currentService.email || ''}
                    onChange={(e) => setCurrentService({ ...currentService, email: e.target.value })}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.phone || ''}
                    onChange={(e) => setCurrentService({ ...currentService, phone: e.target.value })}
                    placeholder="Phone"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Service Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.serviceType || ''}
                    onChange={(e) => setCurrentService({ ...currentService, serviceType: e.target.value })}
                    placeholder="Service Type"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Bike Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.bikeType || ''}
                    onChange={(e) => setCurrentService({ ...currentService, bikeType: e.target.value })}
                    placeholder="Bike Type"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Service Person</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.servicePerson || ''}
                    onChange={(e) => setCurrentService({ ...currentService, servicePerson: e.target.value })}
                    placeholder="Service Person"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Complaints</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.complaints || ''}
                    onChange={(e) => setCurrentService({ ...currentService, complaints: e.target.value })}
                    placeholder="Complaints"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentService.description || ''}
                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentService.price || ''}
                    onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Service Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={currentService.serviceDate ? new Date(currentService.serviceDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentService({ ...currentService, serviceDate: e.target.value })}
                    placeholder="Service Date"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <table className="table table-dark table-striped service-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Type</th>
                <th>Bike Type</th>
                <th>Repaired Parts</th>
                <th>Service Person</th>
                <th>Complaints</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Service Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterservices.map((service) => (
                <tr key={service._id} id={`service-row-${service._id}`}>
                  <td>{service.name}</td>
                  <td>{service.email}</td>
                  <td>{service.phone}</td>
                  <td>{service.serviceType}</td>
                  <td>{service.bikeType}</td>
                  <td>{service.repairedParts.map((part) => `${part.name} ($${part.price})`).join(', ')}</td>
                  <td>{service.servicePerson}</td>
                  <td>{service.complaints}</td>
                  <td>{service.description}</td>
                  <td>${service.price}</td>
                  <td className={getStatusClass(service.status)}>{service.status}</td>
                  <td>{service.date}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(service)}
                      disabled={service.status === 'Out for delivery' || service.status === 'Completed'}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(service._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ServiceList;


//workinh until crud

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/ServiceList.css';

// const ServiceList = () => {
//   const [services, setServices] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentService, setCurrentService] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/services');
//         setServices(response.data);
//       } catch (error) {
//         console.error('Error fetching services', error);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleEdit = (service) => {
//     setIsEditing(true);
//     setCurrentService(service);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!currentService || !currentService._id) {
//       console.error('Invalid service ID');
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:5000/api/services/${currentService._id}`, currentService);
//       console.log('Service updated:', response.data);
//       setIsEditing(false);
//       setCurrentService(null);
//       setServices((prevServices) =>
//         prevServices.map((service) =>
//           service._id === response.data._id ? response.data : service
//         )
//       );
//     } catch (error) {
//       console.error('Error updating service:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/services/${id}`);
//       console.log('Service deleted:', response.data);
//       setServices((prevServices) => prevServices.filter((service) => service._id !== id));
//     } catch (error) {
//       console.error('Error deleting service', error);
//     }
//   };

//   return (
//     <div className="service-list-container">
//       <h2>Service List</h2>
//       {isEditing && currentService ? (
//         <div className="edit-form">
//           <h3>Edit Service</h3>
//           <form onSubmit={handleUpdate}>
//             <input
//               type="text"
//               value={currentService.name || ''}
//               onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
//               placeholder="Name"
//               required
//             />
//             <input
//               type="email"
//               value={currentService.email || ''}
//               onChange={(e) => setCurrentService({ ...currentService, email: e.target.value })}
//               placeholder="Email"
//               required
//             />
//             <input
//               type="text"
//               value={currentService.phone || ''}
//               onChange={(e) => setCurrentService({ ...currentService, phone: e.target.value })}
//               placeholder="Phone"
//               required
//             />
//             <input
//               type="text"
//               value={currentService.serviceType || ''}
//               onChange={(e) => setCurrentService({ ...currentService, serviceType: e.target.value })}
//               placeholder="Service Type"
//               required
//             />
//             <input
//               type="text"
//               value={currentService.bikeType || ''}
//               onChange={(e) => setCurrentService({ ...currentService, bikeType: e.target.value })}
//               placeholder="Bike Type"
//               required
//             />
//             <input
//               type="text"
//               value={currentService.servicePerson || ''}
//               onChange={(e) => setCurrentService({ ...currentService, servicePerson: e.target.value })}
//               placeholder="Service Person"
//               required
//             />
//             <input
//               type="text"
//               value={currentService.complaints || ''}
//               onChange={(e) => setCurrentService({ ...currentService, complaints: e.target.value })}
//               placeholder="Complaints"
//             />
//             <input
//               type="text"
//               value={currentService.description || ''}
//               onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
//               placeholder="Description"
//             />
//             <input
//               type="number"
//               value={currentService.price || ''}
//               onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
//               placeholder="Price"
//               required
//             />
//             <input
//               type="date"
//               value={currentService.serviceDate ? new Date(currentService.serviceDate).toISOString().split('T')[0] : ''}
//               onChange={(e) => setCurrentService({ ...currentService, serviceDate: e.target.value })}
//               placeholder="Service Date"
//               required
//             />
//             <button type="submit">Update</button>
//             <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//           </form>
//         </div>
//       ) : (
//         <table className="service-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Service Type</th>
//               <th>Bike Type</th>
//               <th>Repaired Parts</th>
//               <th>Service Person</th>
//               <th>Complaints</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Service Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {services.map((service) => (
//               <tr key={service._id}>
//                 <td>{service.name}</td>
//                 <td>{service.email}</td>
//                 <td>{service.phone}</td>
//                 <td>{service.serviceType}</td>
//                 <td>{service.bikeType}</td>
//                 <td>{service.repairedParts.map((part) => `${part.name} ($${part.price})`).join(', ')}</td>
//                 <td>{service.servicePerson}</td>
//                 <td>{service.complaints}</td>
//                 <td>{service.description}</td>
//                 <td>${service.price}</td>
//                 <td>{new Date(service.serviceDate).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleEdit(service)}>Edit</button>
//                   <button onClick={() => handleDelete(service._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ServiceList;





