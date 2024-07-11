const nodemailer = require('nodemailer');

// Function to send email using Nodemailer
async function sendTestEmail() {
  try {
    // Create a test account using Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create a Nodemailer transporter using Ethereal SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: 'your-email@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email sent using Nodemailer and Ethereal.',
    });

    console.log('Email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
