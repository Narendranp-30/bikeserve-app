import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const ServiceForm = ({ onSubmit, serviceToEdit }) => {
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

  useEffect(() => {
    if (serviceToEdit) {
      setName(serviceToEdit.name);
      setEmail(serviceToEdit.email);
      setPhone(serviceToEdit.phone);
      setServiceType(serviceToEdit.serviceType);
      setBikeType(serviceToEdit.bikeType);
      setRepairedParts(serviceToEdit.repairedParts);
      setServicePerson(serviceToEdit.servicePerson);
      setComplaints(serviceToEdit.complaints);
      setDescription(serviceToEdit.description);
      setPrice(serviceToEdit.price);
      setServiceDate(serviceToEdit.serviceDate);
      setShowLaborCharge(serviceToEdit.serviceType !== 'free');
    }
  }, [serviceToEdit]);

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
      serviceDate
    };

    try {
      let response;
      if (serviceToEdit) {
        response = await axios.put(`http://localhost:5000/api/services/${serviceToEdit._id}`, serviceDetails);
      } else {
        response = await axios.post('http://localhost:5000/api/services', serviceDetails);
      }
      onSubmit(response.data);
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
    } catch (error) {
      console.error('Error adding/updating service', error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>{serviceToEdit ? 'Edit Service' : 'Add a New Service'}</h2>
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
        <div style={styles.checkboxGroup}>
          <div style={styles.subHeading}>Repaired Parts</div>
          {partsOptions.map((part) => (
            <div key={part.name} style={styles.checkboxItem}>
              <input
                type="checkbox"
                id={part.name}
                value={part.name}
                onChange={handlePartsChange}
                checked={repairedParts.some((p) => p.name === part.name)}
              />
              <label htmlFor={part.name}>{`${part.name} ($${part.price})`}</label>
            </div>
          ))}
        </div>
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
          style={styles.textArea}
        />
        {errors.complaints && <div style={styles.error}>{errors.complaints}</div>}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textArea}
        />
        {errors.description && <div style={styles.error}>{errors.description}</div>}
        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          required
          style={styles.input}
        />
        {errors.serviceDate && <div style={styles.error}>{errors.serviceDate}</div>}
        <button type="submit" style={styles.button}>
          {serviceToEdit ? 'Update Service' : 'Add Service'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    width: '60%',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  checkboxGroup: {
    marginBottom: '15px',
  },
  subHeading: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  checkboxItem: {
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '5px',
  },
};

export default ServiceForm;









//workinh until crud

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const partsOptions = [
//   { name: 'Brake Pads', price: 30 },
//   { name: 'Chain', price: 20 },
//   { name: 'Tires', price: 50 },
//   { name: 'Handlebars', price: 40 },
//   { name: 'Pedals', price: 15 },
//   { name: 'Seat', price: 25 },
//   { name: 'Gear Shifters', price: 45 },
//   { name: 'Cables', price: 10 },
//   { name: 'Crankset', price: 60 },
//   { name: 'Derailleurs', price: 35 },
// ];

// const servicePersons = [
//   { name: 'John Doe', experience: '5 years' },
//   { name: 'Jane Smith', experience: '8 years' },
//   { name: 'Bob Johnson', experience: '3 years' },
// ];

// const laborCharge = 50;

// const serviceTypes = [
//   { value: 'general', label: 'General Service Check-up' },
//   { value: 'oil_change', label: 'Oil Change' },
//   { value: 'water_wash', label: 'Water Wash' },
//   { value: 'free', label: 'Free Service' },
// ];

// const ServiceForm = ({ onSubmit, serviceToEdit }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [serviceType, setServiceType] = useState('');
//   const [bikeType, setBikeType] = useState('');
//   const [repairedParts, setRepairedParts] = useState([]);
//   const [servicePerson, setServicePerson] = useState('');
//   const [complaints, setComplaints] = useState('');
//   const [description, setDescription] = useState('');
//   const [showLaborCharge, setShowLaborCharge] = useState(true);
//   const [price, setPrice] = useState(0);
//   const [serviceDate, setServiceDate] = useState('');
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (serviceToEdit) {
//       setName(serviceToEdit.name);
//       setEmail(serviceToEdit.email);
//       setPhone(serviceToEdit.phone);
//       setServiceType(serviceToEdit.serviceType);
//       setBikeType(serviceToEdit.bikeType);
//       setRepairedParts(serviceToEdit.repairedParts);
//       setServicePerson(serviceToEdit.servicePerson);
//       setComplaints(serviceToEdit.complaints);
//       setDescription(serviceToEdit.description);
//       setPrice(serviceToEdit.price);
//       setServiceDate(serviceToEdit.serviceDate);
//       setShowLaborCharge(serviceToEdit.serviceType !== 'free');
//     }
//   }, [serviceToEdit]);

//   const handlePartsChange = (e) => {
//     const { value, checked } = e.target;
//     const selectedPart = partsOptions.find((part) => part.name === value);

//     if (checked) {
//       setRepairedParts([...repairedParts, selectedPart]);
//       setPrice(price + selectedPart.price);
//     } else {
//       setRepairedParts(repairedParts.filter((part) => part.name !== value));
//       setPrice(price - selectedPart.price);
//     }
//   };

//   const handleServiceTypeChange = (e) => {
//     const selectedServiceType = e.target.value;
//     setServiceType(selectedServiceType);
//     setShowLaborCharge(selectedServiceType !== 'free');
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!name) newErrors.name = 'Name is required';
//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!phone) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(phone)) {
//       newErrors.phone = 'Phone number is invalid';
//     }
//     if (!serviceType) newErrors.serviceType = 'Service type is required';
//     if (!bikeType) newErrors.bikeType = 'Bike type is required';
//     if (!repairedParts.length) newErrors.repairedParts = 'At least one repaired part is required';
//     if (!servicePerson) newErrors.servicePerson = 'Service person is required';
//     if (!complaints) newErrors.complaints = 'Complaints field is required';
//     if (!description) newErrors.description = 'Description is required';
//     if (!serviceDate) newErrors.serviceDate = 'Service date is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     let totalPartsPrice = repairedParts.reduce((total, part) => total + part.price, 0);
//     let totalPrice = totalPartsPrice;

//     if (showLaborCharge && serviceType !== 'free') {
//       totalPrice += laborCharge;
//     }

//     const serviceDetails = {
//       name,
//       email,
//       phone,
//       serviceType,
//       bikeType,
//       repairedParts,
//       servicePerson,
//       complaints,
//       description,
//       price: totalPrice,
//       serviceDate
//     };

//     try {
//       let response;
//       if (serviceToEdit) {
//         response = await axios.put(`http://localhost:5000/api/services/${serviceToEdit._id}`, serviceDetails);
//       } else {
//         response = await axios.post('http://localhost:5000/api/services', serviceDetails);
//       }
//       onSubmit(response.data);
//       setName('');
//       setEmail('');
//       setPhone('');
//       setServiceType('');
//       setBikeType('');
//       setRepairedParts([]);
//       setServicePerson('');
//       setComplaints('');
//       setDescription('');
//       setPrice(0);
//       setServiceDate('');
//       setErrors({});
//     } catch (error) {
//       console.error('Error adding/updating service', error);
//     }
//   };

//   return (
//     <div style={styles.formContainer}>
//       <h2 style={styles.heading}>{serviceToEdit ? 'Edit Service' : 'Add a New Service'}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={styles.input}
//         />
//         {errors.name && <div style={styles.error}>{errors.name}</div>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={styles.input}
//         />
//         {errors.email && <div style={styles.error}>{errors.email}</div>}
//         <input
//           type="tel"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//           style={styles.input}
//         />
//         {errors.phone && <div style={styles.error}>{errors.phone}</div>}
//         <select
//           value={serviceType}
//           onChange={handleServiceTypeChange}
//           required
//           style={styles.input}
//         >
//           <option value="">Select Service Type</option>
//           {serviceTypes.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//         {errors.serviceType && <div style={styles.error}>{errors.serviceType}</div>}
//         <input
//           type="text"
//           placeholder="Bike Type"
//           value={bikeType}
//           onChange={(e) => setBikeType(e.target.value)}
//           required
//           style={styles.input}
//         />
//         {errors.bikeType && <div style={styles.error}>{errors.bikeType}</div>}
//         <div style={styles.checkboxGroup}>
//           <div style={styles.subHeading}>Repaired Parts</div>
//           {partsOptions.map((part) => (
//             <div key={part.name} style={styles.checkboxItem}>
//               <input
//                 type="checkbox"
//                 id={part.name}
//                 value={part.name}
//                 onChange={handlePartsChange}
//                 checked={repairedParts.some((p) => p.name === part.name)}
//               />
//               <label htmlFor={part.name}>{`${part.name} ($${part.price})`}</label>
//             </div>
//           ))}
//         </div>
//         {errors.repairedParts && <div style={styles.error}>{errors.repairedParts}</div>}
//         <select
//           value={servicePerson}
//           onChange={(e) => setServicePerson(e.target.value)}
//           required
//           style={styles.input}
//         >
//           <option value="">Select Service Person</option>
//           {servicePersons.map((person) => (
//             <option key={person.name} value={person.name}>
//               {person.name} - {person.experience}
//             </option>
//           ))}
//         </select>
//         {errors.servicePerson && <div style={styles.error}>{errors.servicePerson}</div>}
//         <textarea
//           placeholder="Complaints"
//           value={complaints}
//           onChange={(e) => setComplaints(e.target.value)}
//           required
//           style={styles.textArea}
//         />
//         {errors.complaints && <div style={styles.error}>{errors.complaints}</div>}
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           style={styles.textArea}
//         />
//         {errors.description && <div style={styles.error}>{errors.description}</div>}
//         <input
//           type="date"
//           value={serviceDate}
//           onChange={(e) => setServiceDate(e.target.value)}
//           required
//           style={styles.input}
//         />
//         {errors.serviceDate && <div style={styles.error}>{errors.serviceDate}</div>}
//         <button type="submit" style={styles.button}>
//           {serviceToEdit ? 'Update Service' : 'Add Service'}
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   formContainer: {
//     width: '60%',
//     margin: 'auto',
//     padding: '20px',
//     boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     backgroundColor: '#f9f9f9',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     marginBottom: '15px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxSizing: 'border-box',
//   },
//   textArea: {
//     width: '100%',
//     padding: '10px',
//     marginBottom: '15px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxSizing: 'border-box',
//     minHeight: '100px',
//   },
//   checkboxGroup: {
//     marginBottom: '15px',
//   },
//   subHeading: {
//     fontSize: '18px',
//     marginBottom: '10px',
//   },
//   checkboxItem: {
//     marginBottom: '5px',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '14px 20px',
//     margin: '8px 0',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     width: '100%',
//     fontSize: '16px',
//   },
//   error: {
//     color: 'red',
//     fontSize: '14px',
//     marginBottom: '5px',
//   },
// };

// export default ServiceForm;
