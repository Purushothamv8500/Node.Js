const express = require('express');
const dotENV = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./router'); // Corrected path

const app = express();
const PORT = process.env.PORT || 9006;

// Configuration
dotENV.config();
app.use(bodyParser.json())
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');

    // Middleware
    app.use(bodyParser.json());
    app.use('/employees', employeeRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
