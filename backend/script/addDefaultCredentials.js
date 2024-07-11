// backend/scripts/addDefaultCredentials.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const defaultCredentials = require('../data/defaultCredentials');

mongoose.connect('mongodb://localhost:27017/bike_service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const addDefaultCredentials = async () => {
  for (const credential of defaultCredentials) {
    const { email, password, district, serviceCenter } = credential;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role: 'owner', district, serviceCenter });
    await newUser.save();
  }
  console.log('Default credentials added');
  mongoose.disconnect();
};

addDefaultCredentials();
