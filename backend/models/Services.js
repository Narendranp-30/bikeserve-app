// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  bikeType: { type: String, required: true },
  repairedParts: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  servicePerson: { type: String, required: true },
  complaints: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required:true},
  district: { type: String, required: true },
  serviceCenter: { type: String, required: true }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;


































//workinh until crud
// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   serviceType: { type: String, required: true },
//   bikeType: { type: String, required: true },
//   repairedParts: [
//     {
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//     },
//   ],
//   servicePerson: { type: String, required: true },
//   complaints: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// });

// const Service = mongoose.model('Service', serviceSchema);

// module.exports = Service;



