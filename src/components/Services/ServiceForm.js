import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const districts = {
  erode: [
    { id: 'erode_center_1', name: 'Erode Service Center 1', email: 'erode1@service.com' },
    { id: 'erode_center_2', name: 'Erode Service Center 2', email: 'erode2@service.com' },
    { id: 'erode_center_3', name: 'Erode Service Center 3', email: 'erode3@service.com' },
  ],
  kovai: [
    { id: 'kovai_center_1', name: 'Kovai Service Center 1', email: 'kovai1@service.com' },
    { id: 'kovai_center_2', name: 'Kovai Service Center 2', email: 'kovai2@service.com' },
    { id: 'kovai_center_3', name: 'Kovai Service Center 3', email: 'kovai3@service.com' },
  ],
  chennai: [
    { id: 'chennai_center_1', name: 'Chennai Service Center 1', email: 'chennai1@service.com' },
    { id: 'chennai_center_2', name: 'Chennai Service Center 2', email: 'chennai2@service.com' },
    { id: 'chennai_center_3', name: 'Chennai Service Center 3', email: 'chennai3@service.com' },
  ],
};

const partsOptions = [
  { name: 'Brake Pads', price: 30 },
  { name: 'Chain', price: 20 },
  { name: 'Tires', price: 50 },
  { name: 'Handlebars', price: 40 },
  { name: 'Pedals', price: 15 },
  { name: 'Seat', price: 25 },
  { name: 'Gear Shifters', price: 45 },
  { name: 'Cables', price: 10 },
  { name: 'Crankset', price: 60 },
  { name: 'Derailleurs', price: 35 },
];

const servicePersons = [
  { name: 'John Doe', experience: '' },
  { name: 'Jane Smith', experience: '' },
  { name: 'Bob Johnson', experience: '' },
];

const laborCharge = 50;

const serviceTypes = [
  { value: 'general', label: 'General Service Check-up' },
  { value: 'oil_change', label: 'Oil Change' },
  { value: 'water_wash', label: 'Water Wash' },
  { value: 'free', label: 'Free Service' },
];

const ServiceForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [bikeType, setBikeType] = useState('');
  const [repairedParts, setRepairedParts] = useState([]);
  const [servicePerson, setServicePerson] = useState('');
  const [complaints, setComplaints] = useState('');
  const [description, setDescription] = useState('');
  const [showLaborCharge, setShowLaborCharge] = useState(true);
  const [price, setPrice] = useState(0);
  const [serviceDate, setServiceDate] = useState('');
  const [errors, setErrors] = useState({});
  const [district, setDistrict] = useState('');
  const [serviceCenter, setServiceCenter] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status
  

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setServiceCenter('');
  };

  const handleServiceCenterChange = (e) => {
    setServiceCenter(e.target.value);
  };

  const handlePartsChange = (e) => {
    const { value, checked } = e.target;
    const selectedPart = partsOptions.find((part) => part.name === value);

    if (checked) {
      setRepairedParts([...repairedParts, selectedPart]);
      setPrice(price + selectedPart.price);
    } else {
      setRepairedParts(repairedParts.filter((part) => part.name !== value));
      setPrice(price - selectedPart.price);
    }
  };

  const handleServiceTypeChange = (e) => {
    const selectedServiceType = e.target.value;
    setServiceType(selectedServiceType);
    setShowLaborCharge(selectedServiceType !== 'free');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number is invalid';
    }


    if (!serviceType) newErrors.serviceType = 'Service type is required';
    if (!bikeType) newErrors.bikeType = 'Bike type is required';
    if (!repairedParts.length) newErrors.repairedParts = 'At least one repaired part is required';
    if (!servicePerson) newErrors.servicePerson = 'Service person is required';
    if (!complaints) newErrors.complaints = 'Complaints field is required';
    if (!description) newErrors.description = 'Description is required';
    if (!serviceDate) newErrors.serviceDate = 'Service date is required';
    if (!district) newErrors.district = 'District is required';
    if (!serviceCenter) newErrors.serviceCenter = 'Service center is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
// const re = /^[5-9]\d{9}$/;
    // const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{6,}$/;
    // return re.test(password);
    //const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return re.test(String(email).toLowerCase());
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    let totalPartsPrice = repairedParts.reduce((total, part) => total + part.price, 0);
    let totalPrice = totalPartsPrice;

    if (showLaborCharge && serviceType !== 'free') {
      totalPrice += laborCharge;
    }

    const selectedCenter = districts[district].find((center) => center.id === serviceCenter);

    const serviceDetails = {
      name,
      email,
      phone,
      serviceType,
      bikeType,
      repairedParts,
      servicePerson,
      complaints,
      description,
      price: totalPrice,
      serviceDate,
      district,
      serviceCenter: selectedCenter.id,
      ownerEmail: selectedCenter.email,
      status, // include the status in the service details
    };
    toast.success("please wait");
    try {
      const response = await axios.post('http://localhost:5000/api/services', serviceDetails);
      // onSubmit(response.data);
      setName('');
      setEmail('');
      setPhone('');
      setServiceType('');
      setBikeType('');
      setRepairedParts([]);
      setServicePerson('');
      setComplaints('');
      setDescription('');
      setPrice(0);
      setServiceDate('');
      setErrors({});
      setDistrict('');
      setServiceCenter('');
      setStatus('Pending'); // Reset status
      toast.success("Service is created successfully")
    } catch (error) {
      console.error('Error adding service', error);
      console.log('Error response data:', error.response.data);
      console.log('Error response status:', error.response.status);
      console.log('Error response headers:', error.response.headers);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // const getMaxDate = () => {
  //   const today = new Date();
  //   const maxDate = new Date(today.setDate(today.getDate() + 10));
  //   const year = maxDate.getFullYear();
  //   const month = String(maxDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  //   const day = String(maxDate.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };
  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Add a New Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        {errors.name && <div style={styles.error}>{errors.name}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        {errors.email && <div style={styles.error}>{errors.email}</div>}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={styles.input}
        />
        {errors.phone && <div style={styles.error}>{errors.phone}</div>}
        <select
          value={serviceType}
          onChange={handleServiceTypeChange}
          required
          style={styles.select}
        >
          <option value="">Select Service Type</option>
          {serviceTypes.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        {errors.serviceType && <div style={styles.error}>{errors.serviceType}</div>}
        <input
          type="text"
          placeholder="Bike Type"
          value={bikeType}
          onChange={(e) => setBikeType(e.target.value)}
          required
          style={styles.input}
        />
        {errors.bikeType && <div style={styles.error}>{errors.bikeType}</div>}
        <div style={styles.partsContainer}>
          <label style={styles.label}>Repaired Parts:</label>
          {partsOptions.map((part) => (
            <label key={part.name} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={part.name}
                checked={repairedParts.includes(part)}
                onChange={handlePartsChange}
              />
              {part.name} (${part.price})
            </label>
          ))}
        </div>
        {errors.repairedParts && <div style={styles.error}>{errors.repairedParts}</div>}
        <select
          value={servicePerson}
          onChange={(e) => setServicePerson(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Select Service Person</option>
          {servicePersons.map((person) => (
            <option key={person.name} value={person.name}>
              {person.name} ({person.experience})
            </option>
          ))}
        </select>
        {errors.servicePerson && <div style={styles.error}>{errors.servicePerson}</div>}
        <textarea
          placeholder="Complaints"
          value={complaints}
          onChange={(e) => setComplaints(e.target.value)}
          required
          style={styles.textarea}
        />
        {errors.complaints && <div style={styles.error}>{errors.complaints}</div>}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        {errors.description && <div style={styles.error}>{errors.description}</div>}
        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          min={getTodayDate()} // Disable past dates
         // max={getMaxDate()}
          required
          style={styles.input}  
        />
        {/* min={getTodayDate()} */}
        {errors.serviceDate && <div style={styles.error}>{errors.serviceDate}</div>}
        <select
          value={district}
          onChange={handleDistrictChange}
          required
          style={styles.select}
        >
          <option value="">Select District</option>
          {Object.keys(districts).map((districtKey) => (
            <option key={districtKey} value={districtKey}>
              {districtKey.charAt(0).toUpperCase() + districtKey.slice(1)}
            </option>
          ))}
        </select>
        {errors.district && <div style={styles.error}>{errors.district}</div>}
        {district && (
          <select
            value={serviceCenter}
            onChange={handleServiceCenterChange}
            required
            style={styles.select}
          >
            <option value="">Select Service Center</option>
            {districts[district].map((center) => (
              <option key={center.id} value={center.id}>
                {center.name}
              </option>
            ))}
          </select>
        )}
        {errors.serviceCenter && <div style={styles.error}>{errors.serviceCenter}</div>}
        {showLaborCharge && <div>Labor Charge: ${laborCharge}</div>}
        <div>Total Price: ${price + (showLaborCharge ? laborCharge : 0)}</div>
        <button type="submit" style={styles.button}>
          Add Service
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  partsContainer: {
    marginBottom: '10px',
  },
  checkboxLabel: {
    display: 'block',
    marginBottom: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default ServiceForm;
