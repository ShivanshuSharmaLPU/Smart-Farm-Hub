const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Advisory = require('../models/Advisory');

// Middleware to check admin role
const adminCheck = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }
        next();
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', auth, adminCheck, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/admin/stats
// @desc    Get system stats
// @access  Private/Admin
router.get('/stats', auth, adminCheck, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const advisoryCount = await Advisory.countDocuments();

        res.json({
            users: userCount,
            advisories: advisoryCount
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
