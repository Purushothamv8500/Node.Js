const express = require('express');
const router = express.Router();

// Import the controller using the correct relative path
const employeeController = require('./models/controllers/employeeController'); // Fixed the path

// Post route to create a new employee
router.post('/add-emp', employeeController.createEmployee);
router.get('/allemployees', employeeController.getEmployees);
router.put('/update/:id', employeeController.updateEmployee); // Fixed the typo in the route path (removed the dot)
router.delete('/delete/:id', employeeController.deleteEmployee);

module.exports = router;
