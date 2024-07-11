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
  { name: 'John Doe', experience: '5 years' },
  { name: 'Jane Smith', experience: '8 years' },
  { name: 'Bob Johnson', experience: '3 years' },
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
          style={styles.input}
        >
          <option value="">Select Service Type</option>
          {serviceTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
        <fieldset style={styles.fieldset}>
          <legend>Repaired Parts</legend>
          {partsOptions.map((part) => (
            <label key={part.name} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={part.name}
                onChange={handlePartsChange}
                style={styles.checkbox}
              />
              {part.name} (${part.price})
            </label>
          ))}
        </fieldset>
        {errors.repairedParts && <div style={styles.error}>{errors.repairedParts}</div>}
        <select
          value={servicePerson}
          onChange={(e) => setServicePerson(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Service Person</option>
          {servicePersons.map((person) => (
            <option key={person.name} value={person.name}>
              {person.name} - {person.experience}
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
        ></textarea>
        {errors.complaints && <div style={styles.error}>{errors.complaints}</div>}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        ></textarea>
        {errors.description && <div style={styles.error}>{errors.description}</div>}
        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          required
          style={styles.input}
        />
        {errors.serviceDate && <div style={styles.error}>{errors.serviceDate}</div>}
        <select value={district} onChange={handleDistrictChange} required style={styles.input}>
          <option value="">Select District</option>
          {Object.keys(districts).map((districtKey) => (
            <option key={districtKey} value={districtKey}>
              {districtKey.charAt(0).toUpperCase() + districtKey.slice(1)}
            </option>
          ))}
        </select>
        {errors.district && <div style={styles.error}>{errors.district}</div>}
        <select value={serviceCenter} onChange={handleServiceCenterChange} required style={styles.input}>
          <option value="">Select Service Center</option>
          {district &&
            districts[district].map((center) => (
              <option key={center.id} value={center.id}>
                {center.name}
              </option>
            ))}
        </select>
        {errors.serviceCenter && <div style={styles.error}>{errors.serviceCenter}</div>}
        <div style={styles.price}>Price: ${price}</div>
        <div style={styles.price}>Labor Charge: ${showLaborCharge ? laborCharge : 0}</div>
        <div style={styles.price}>Total Price: ${price + (showLaborCharge ? laborCharge : 0)}</div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};
const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #333', // Darker border
    borderRadius: '5px',
    backgroundColor: '#1a1a1a', // Dark background
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#fff', // White text
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #444', // Darker border
    backgroundColor: '#333', // Darker input background
    color: '#fff', // White text
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #444', // Darker border
    backgroundColor: '#333', // Darker input background
    color: '#fff', // White text
    height: '100px',
  },
  fieldset: {
    border: '1px solid #444', // Darker border
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    color: '#fff', // White text
  },
  checkboxLabel: {
    display: 'block',
    margin: '5px 0',
    color: '#fff', // White text
  },
  checkbox: {
    marginRight: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  price: {
    margin: '10px 0',
    fontWeight: 'bold',
    color: '#fff', // White text
  },
  error: {
    color: 'red',
    margin: '5px 0',
  },
};

export default ServiceForm;
