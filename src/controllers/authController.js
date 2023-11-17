const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Function to create a new user
const signup = async (req, res) => {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user already exists
        const userCheckQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [userExists] = await db.query(userCheckQuery, [email]);

        if (userExists.length > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into database
        const insertQuery = 'INSERT INTO users (username, full_name, email, password_hash) VALUES (?, ?, ?, ?)';
        await db.query(insertQuery, [username, fullName, email, hashedPassword]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function for user login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Check if user exists
        const userQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [user] = await db.query(userQuery, [email]);

        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    signup,
    login
};
