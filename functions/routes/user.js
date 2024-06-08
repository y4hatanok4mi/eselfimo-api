const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate request
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        console.error("Error in signup route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // For simplicity, in real applications, you'd generate and send a JWT token here
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
