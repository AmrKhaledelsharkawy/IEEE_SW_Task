// Import necessary modules and packages
const express = require('express');
const bodyParser = require('body-parser');
const gpaRouter = require('../backend/routes/gpa'); // Import your GPA route
require('dotenv').config()

// Create an instance of the Express application
const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  });
// Middleware: Parse JSON request bodies
app.use(bodyParser.json());

// Define your routes
app.use('/', gpaRouter); // Use the GPA route for GPA calculations

// Define a default route for testing
app.get('/', (req, res) => {
  res.send('Hello, GPA Calculator API!');
});

// Start the server on a specified port
const PORT = process.env.PORT; // You can use any available port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
