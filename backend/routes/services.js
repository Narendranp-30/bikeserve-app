const express = require('express');
const router = express.Router();
const Service = require('../models/Services');
const nodemailer = require('nodemailer');
const transporter = require('../mailer');  // Assuming mailer.js exports transporter

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error('Error fetching services', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new service
router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    serviceType,
    bikeType,
    repairedParts,
    servicePerson,
    complaints,
    description,
    price,
    serviceDate,
    district,
    serviceCenter,
    ownerEmail,
    status,
  } = req.body;

  try {
    const newService = new Service({
      name,
      email,
      phone,
      serviceType,
      bikeType,
      repairedParts,
      servicePerson,
      complaints,
      description,
      price,
      date: serviceDate,
      district,
      serviceCenter,
      status,
    });

    await newService.save();

    // Send email to owner
    const mailOptions = {
      from: {email},
      to: 'prasanthnarendra92@gmail.com',
      subject: 'New Service Submission',
      text: `
        A new service has been submitted.
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service Type: ${serviceType}
        Bike Type: ${bikeType}
        Repaired Parts: ${repairedParts.map(part => part.name).join(', ')}
        Service Person: ${servicePerson}
        Complaints: ${complaints}
        Description: ${description}
        Price: ${price}
        Service Date: ${serviceDate}
        Status: ${status}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newService);
  } catch (error) {
    console.error('Error saving service', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update service by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (err) {
    console.error('Error updating service', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE service by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST send email to customer
router.post('/sendEmail', async (req, res) => {
  const { customerEmail, serviceDetails,status } = req.body;

  try {
    console.log("hai")
    console.log(status);
    if(status==null)
    {
      const mailOptions = {
        from: 'prasanthnarendra92@gmail.com',
        to: customerEmail,
        subject: 'Service Update',
        text: `
          Your service request is accepted:
               Here Your Details
          Service Type: ${serviceDetails.serviceType}
          Bike Type: ${serviceDetails.bikeType}
          Service Date: ${serviceDetails.date}
          Status: ${serviceDetails.status}
          Complaints: ${serviceDetails.complaints}
          Description: ${serviceDetails.description}
          Service Center: ${serviceDetails.serviceCenter}
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Email sent successfully' });
    }
    else if(status=='approved')
    {
      const mailOptions = {
        from: 'prasanthnarendra92@gmail.com',
        to: customerEmail,
        subject: 'Service Out for delivery',
        text: `
          Your service Request is finished:
               Here Your Details
          Service Type: ${serviceDetails.serviceType}
          Bike Type: ${serviceDetails.bikeType}
          Service Date: ${serviceDetails.date}
          Status: ${serviceDetails.status}
          Complaints: ${serviceDetails.complaints}
          Description: ${serviceDetails.description}
          Service Center: ${serviceDetails.serviceCenter}
        `,
      };
      
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Email sent successfully' });
    }
    else if(status=='Out for delivery')
      {
        const mailOptions = {
          from: 'prasanthnarendra92@gmail.com',
          to: customerEmail,
          subject: 'Service completed',
          text: `
            Your service Request is completed and delivered:
                 Here Your Details
            Service Type: ${serviceDetails.serviceType}
            Bike Type: ${serviceDetails.bikeType}
            Service Date: ${serviceDetails.date}
            Status: ${serviceDetails.status}
            Complaints: ${serviceDetails.complaints}
            Description: ${serviceDetails.description}
            Service Center: ${serviceDetails.serviceCenter}
          `,
        };
        
    
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ message: 'Email sent successfully' });
      }
    // Send email to customer
    
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;























// working until crud
// const express = require('express');
// const router = express.Router();
// const Service = require('../models/Services');

// // Add a new service
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, phone, serviceType, bikeType, repairedParts, servicePerson, complaints, description, price, serviceDate } = req.body;

//     const service = new Service({
//       name,
//       email,
//       phone,
//       serviceType,
//       bikeType,
//       repairedParts,
//       servicePerson,
//       complaints,
//       description,
//       price,
//       serviceDate
//     });

//     await service.save();
//     res.status(201).json(service);
//   } catch (error) {
//     console.error('Error adding service:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update a service
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone, serviceType, bikeType, repairedParts, servicePerson, complaints, description, price, serviceDate } = req.body;

//   try {
//     const updatedService = await Service.findByIdAndUpdate(id, {
//       name,
//       email,
//       phone,
//       serviceType,
//       bikeType,
//       repairedParts,
//       servicePerson,
//       complaints,
//       description,
//       price,
//       serviceDate
//     }, { new: true });

//     res.json(updatedService);
//   } catch (error) {
//     console.error('Error updating service:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete a service
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Service.findByIdAndDelete(id);
//     res.json({ message: 'Service deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting service:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
