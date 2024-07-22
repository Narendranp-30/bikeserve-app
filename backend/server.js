// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Service = require('./models/Services');
const serviceRoutes = require('./routes/services');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://nprasanth372:narendra372@cluster0.5dlb924.mongodb.net/Bike_Service?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Default credentials (hardcoded for simplicity)
const defaultCredentials = [
  { serviceCenter: 'erode_center_1', email: 'erode1@example.com', password: 'password1', ownerName: 'Erode 1' },
  { serviceCenter: 'erode_center_2', email: 'erode2@example.com', password: 'password2', ownerName: 'Erode 2' },
  { serviceCenter: 'erode_center_3', email: 'erode3@example.com', password: 'password3', ownerName: 'Erode 3' },
  { serviceCenter: 'kovai_center_1', email: 'kovai1@example.com', password: 'password4', ownerName: 'Kovai 1' },
  { serviceCenter: 'kovai_center_2', email: 'kovai2@example.com', password: 'password5', ownerName: 'Kovai 2' },
  { serviceCenter: 'kovai_center_3', email: 'kovai3@example.com', password: 'password6', ownerName: 'Kovai 3' },
  { serviceCenter: 'chennai_center_1', email: 'chennai1@example.com', password: 'password7', ownerName: 'Chennai 1' },
  { serviceCenter: 'chennai_center_2', email: 'chennai2@example.com', password: 'password8', ownerName: 'Chennai 2' },
  { serviceCenter: 'chennai_center_3', email: 'chennai3@example.com', password: 'password9', ownerName: 'Chennai 3' }
];

// Route to get default credentials
app.get('/api/defaultCredentials', (req, res) => {
  res.json(defaultCredentials);
});

// Register route
app.post('/auth/register', async (req, res) => {
  const { email, password, role, phoneNumber } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role, phoneNumber });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, user: { role: user.role, phoneNumber: user.phoneNumber, email: user.email } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
});

// Use the services route
app.use('/api/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});









































//workinh until crud
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');
// const Service = require('./models/Services'); // Ensure correct path
// const serviceRoutes = require('./routes/services');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/bike_service', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Register route
// app.post('/auth/register', async (req, res) => {
//   const { email, password, role, phoneNumber } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword, role, phoneNumber });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// });

// // Login route
// app.post('/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
//     res.json({ token, user: { role: user.role, phoneNumber: user.phoneNumber } });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'Error logging in user', error });
//   }
// });

// // Use the services route
// app.use('/api/services', serviceRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });






