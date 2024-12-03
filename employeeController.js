const mongoose = require('mongoose');
const Employee = require('../../models/Employee'); // Adjusted the path to the model

// Controller to create a new employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;

        const employee = new Employee({
            name,
            email,
            phone,
            city,
        });

        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.log("There was an error", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('There was an error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to update employee details
const updateEmployee = async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;

        const myEmployee = await Employee.findByIdAndUpdate(
            req.params.id, { name, email, phone, city }, { new: true }
        );
        if (!myEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(myEmployee);
    } catch (error) {
        console.error("There is an error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(204).send(); // No content
    } catch (error) {
        console.log("There is an error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Exporting the controller functions
module.exports = {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
};
