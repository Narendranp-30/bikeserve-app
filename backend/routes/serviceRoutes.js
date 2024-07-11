const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const sendServiceDetails = require('../mailer');
const User = require('../models/User');

router.post('/api/services', async (req, res) => {
  const { name, email, phone, serviceType, bikeType, repairedParts, servicePerson, complaints, description, price, serviceDate, district, serviceCenter } = req.body;

  try {
    const service = new Service({ name, email, phone, serviceType, bikeType, repairedParts, servicePerson, complaints, description, price, serviceDate, district, serviceCenter });
    await service.save();

    const owner = await User.findOne({ role: 'owner', district, serviceCenter });
    if (owner) {
      await sendServiceDetails(owner.email, service);
    }

    res.status(201).json(service);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Error adding service' });
  }
});

module.exports = router;
