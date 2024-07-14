const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../models/database'); // Assuming your user model is in a models directory
const secret_key = process.env.JWT_SECRET;
const User = database.User;
const sendgrid = require("../utils/services/sendgrid")
const sendEmail = sendgrid.sendEmailWithSendGrid
// User signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role : "User"
        });
        await sendEmail(
            "User Registered on Libro",
            [email],
            `Hey ${name}, You are registered on libro`
        )
        await user.save();

        const token = await user.generateAuthToken();
        return res.status(201).json({ message: "User Created Successfully", user: user.getPublicProfile(), token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ user: user.getPublicProfile(), token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        updates.forEach((update) => user[update] = req.body[update]);
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 8);
        }
        await user.save();
        res.status(200).json({ user: user.getPublicProfile() });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get public user data
exports.getPublicUserData = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('borrowedBooks')
            .populate('notifications');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user: user.getPublicProfile() });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
