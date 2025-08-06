const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your SMTP transporter (Gmail, Outlook, or Mailtrap for testing)
//const transporter = nodemailer.createTransport({
 // service: 'gmail', // or 'hotmail' for Outlook
 // auth: {
 //   user: 'umeshkumar0509@gmail.com', // set in environment variables
 //   pass: 'pduq qfdn ofdm iaco'  // set in environment variables
 // }
//});

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'hotmail' for Outlook
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

app.post('/send-email', async (req, res) => {
  const { recipient, subject, html } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      html
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
