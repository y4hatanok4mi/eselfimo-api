const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/user');

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        //validate the request
        if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Username and Password are required" });
        }
        //check if author already exists
        const existingUser = await User.findOne({
        username: req.body.username,
        });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }
    
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(201).json({ message: "Author created", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
        }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // For simplicity, in real applications, you'd generate and send a JWT token here
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Route for creating a task
router.post('/', async (req, res) => {
    const { title, description, dueDate } = req.body;

    try {
        // Create new task
        const newTask = new Task({ title, description, dueDate });
        await newTask.save();

        res.status(201).json({ message: 'Task created successfully.', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Route for editing a task
router.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueDate, completed } = req.body;

    try {
        // Find task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        // Update task
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.completed = completed;
        await task.save();

        res.status(200).json({ message: 'Task updated successfully.', task });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Route for deleting a task
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find task by ID and delete
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json({ message: 'Task deleted successfully.', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;