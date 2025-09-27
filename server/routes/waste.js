const express = require('express');
const router = express.Router();

// @route   POST /api/waste/report
// @desc    Report waste for collection
// @access  Private
router.post('/report', (req, res) => {
  res.json({ message: 'Report waste endpoint - Coming soon!' });
});

// @route   GET /api/waste/nearby
// @desc    Get nearby waste collection points
// @access  Public
router.get('/nearby', (req, res) => {
  res.json({ message: 'Nearby waste points endpoint - Coming soon!' });
});

// @route   POST /api/waste/classify
// @desc    AI waste classification
// @access  Private
router.post('/classify', (req, res) => {
  res.json({ message: 'Waste classification endpoint - Coming soon!' });
});

module.exports = router;