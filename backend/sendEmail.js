const nodemailer = require('nodemailer');

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nprasanth372@gmail.com',  // Your Gmail address
    pass: 'uybi hmzm bkuc yeko',           // Your Gmail password
  },
});

module.exports = transporter;
