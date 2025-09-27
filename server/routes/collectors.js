const express = require('express');
const router = express.Router();

// @route   GET /api/collectors/nearby
// @desc    Get nearby waste collectors
// @access  Public
router.get('/nearby', (req, res) => {
  res.json({ message: 'Nearby collectors endpoint - Coming soon!' });
});

// @route   POST /api/collectors/request
// @desc    Request waste collection
// @access  Private
router.post('/request', (req, res) => {
  res.json({ message: 'Request collection endpoint - Coming soon!' });
});

// @route   GET /api/collectors/status/:id
// @desc    Get collection request status
// @access  Private
router.get('/status/:id', (req, res) => {
  res.json({ message: 'Collection status endpoint - Coming soon!' });
});

module.exports = router;