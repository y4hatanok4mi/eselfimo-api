const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            
        });

        await newUser.save();

        res.status(200).json({ message: 'Signup successful', username });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});



// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        res.json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server Error!' });
    }
});


module.exports = router;
