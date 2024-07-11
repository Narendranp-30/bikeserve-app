// backend/seedOwners.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const owners = [
  { email: 'erode1@service.com', password: 'default123', role: 'owner', district: 'Erode', serviceCenter: 'Center1' },
  { email: 'erode2@service.com', password: 'default123', role: 'owner', district: 'Erode', serviceCenter: 'Center2' },
  { email: 'erode3@service.com', password: 'default123', role: 'owner', district: 'Erode', serviceCenter: 'Center3' },
  { email: 'kovai1@service.com', password: 'default123', role: 'owner', district: 'Kovai', serviceCenter: 'Center1' },
  { email: 'kovai2@service.com', password: 'default123', role: 'owner', district: 'Kovai', serviceCenter: 'Center2' },
  { email: 'kovai3@service.com', password: 'default123', role: 'owner', district: 'Kovai', serviceCenter: 'Center3' },
  { email: 'chennai1@service.com', password: 'default123', role: 'owner', district: 'Chennai', serviceCenter: 'Center1' },
  { email: 'chennai2@service.com', password: 'default123', role: 'owner', district: 'Chennai', serviceCenter: 'Center2' },
  { email: 'chennai3@service.com', password: 'default123', role: 'owner', district: 'Chennai', serviceCenter: 'Center3' },
];

const seedOwners = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bike_service', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    for (const owner of owners) {
      const hashedPassword = await bcrypt.hash(owner.password, 10);
      const newUser = new User({ ...owner, password: hashedPassword });
      await newUser.save();
    }

    console.log('Default owners created');
    process.exit();
  } catch (error) {
    console.error('Error creating owners:', error);
    process.exit(1);
  }
};

seedOwners();
