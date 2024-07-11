// backend/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nprasanth372@gmail.com',
    pass: 'uybi hmzm bkuc yeko',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error setting up transporter', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

module.exports = transporter;
