// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  bikeType: { type: String, required: true },
  repairedParts: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  servicePerson: { type: String, required: true },
  complaints: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  labourCharge: { type: Number, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
