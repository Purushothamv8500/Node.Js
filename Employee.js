const Employee = require('../models/Employee'); // Corrected path to the model

const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;

        const employee = new Employee({
            name,
            email,
            phone,
            city,
        });

        await employee.save(); // Save the new employee document to the database
        res.status(201).json(employee); // Respond with the created employee object
    } catch (error) {
        console.error("There was an error creating the employee:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Export the function so it can be used in the router
module.exports = { createEmployee };
