const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'gmail.html'));
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Replace with your actual email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'naveenkvg8@gmail.com',      // ✅ Your Gmail
      pass: 'epso ikaw xkku pwmi'           // ✅ App password (not your regular password)
    }
  });

  const mailOptions = {
    from: email,
    to: 'naveen.cs23@bitsathy.ac.in',          // ✅ Receiver (can be same as sender)
    subject: `Message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('✅ Email sent successfully!');
  } catch (err) {
    console.error(err);
    res.send('❌ Error sending email');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
