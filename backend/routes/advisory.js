const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const axios = require('axios');
const Advisory = require('../models/Advisory');

// @route   POST api/advisory/crop
// @desc    Get crop recommendation
// @access  Private
router.post('/crop', auth, async (req, res) => {
    try {
        const inputs = req.body;
        console.log('Sending request to ML Service /predict_crop:', inputs);

        // Call Flask ML Service
        const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict_crop`, inputs);

        // My Flask API now returns { "success": true, "prediction": "...", "input_data": {...} }
        const prediction = mlResponse.data.prediction;

        // Save history
        const newAdvisory = new Advisory({
            userId: req.user.id,
            type: 'crop',
            inputs,
            prediction
        });
        await newAdvisory.save();

        res.json({ success: true, prediction });
    } catch (err) {
        if (err.response) {
            console.error('ML Service Error Response:', err.response.data);
            res.status(err.response.status).json(err.response.data);
        } else {
            console.error('Backend Advisory Error:', err.message);
            res.status(500).send('ML Service (Flask) is not responding. Ensure it is running on Port 5001.');
        }
    }
});

// @route   POST api/advisory/fertilizer
// @desc    Get fertilizer recommendation
// @access  Private
router.post('/fertilizer', auth, async (req, res) => {
    try {
        const inputs = req.body;
        console.log('Sending request to ML Service /predict_fertilizer:', inputs);

        // Call Flask ML Service
        const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict_fertilizer`, inputs);

        const prediction = mlResponse.data.prediction;

        // Save history
        const newAdvisory = new Advisory({
            userId: req.user.id,
            type: 'fertilizer',
            inputs,
            prediction
        });
        await newAdvisory.save();

        res.json({ success: true, prediction });
    } catch (err) {
        if (err.response) {
            console.error('ML Service Error Response:', err.response.data);
            res.status(err.response.status).json(err.response.data);
        } else {
            console.error('Backend Advisory Error:', err.message);
            res.status(500).send('ML Service (Flask) is not responding.');
        }
    }
});

// @route   POST api/advisory/yield
// @desc    Get yield prediction
// @access  Private
router.post('/yield', auth, async (req, res) => {
    try {
        const inputs = req.body;
        console.log('Sending request to ML Service /predict_yield:', inputs);
        const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict_yield`, inputs);

        const prediction = mlResponse.data.prediction;

        const newAdvisory = new Advisory({
            userId: req.user.id,
            type: 'yield',
            inputs,
            prediction
        });
        await newAdvisory.save();

        res.json({ success: true, prediction });
    } catch (err) {
        if (err.response) {
            console.error('ML Service Error Response:', err.response.data);
            res.status(err.response.status).json(err.response.data);
        } else {
            console.error('Backend Yield Error:', err.message);
            res.status(500).send('ML Service (Flask) is not responding.');
        }
    }
});

// @route   POST api/advisory/disease
// @desc    Detect disease (Mock)
// @access  Private
router.post('/disease', auth, async (req, res) => {
    try {
        const inputs = req.body;
        console.log('Sending request to ML Service /predict_disease:', inputs);

        const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict_disease`, inputs);

        const prediction = mlResponse.data.prediction;

        const newAdvisory = new Advisory({
            userId: req.user.id,
            type: 'disease',
            inputs,
            prediction
        });
        await newAdvisory.save();

        res.json({ success: true, prediction });
    } catch (err) {
        if (err.response) {
            console.error('ML Service Error Response:', err.response.data);
            res.status(err.response.status).json(err.response.data);
        } else {
            console.error('Backend Disease Error:', err.message);
            res.status(500).send('ML Service (Flask) is not responding.');
        }
    }
});

// @route   GET api/advisory/history
// @desc    Get user advisory history
// @access  Private
router.get('/history', auth, async (req, res) => {
    try {
        const advisories = await Advisory.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(advisories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
