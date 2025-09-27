const express = require('express');
const router = express.Router();

// @route   GET /api/rewards/balance
// @desc    Get user reward balance
// @access  Private
router.get('/balance', (req, res) => {
  res.json({ message: 'Reward balance endpoint - Coming soon!' });
});

// @route   POST /api/rewards/redeem
// @desc    Redeem rewards
// @access  Private
router.post('/redeem', (req, res) => {
  res.json({ message: 'Redeem rewards endpoint - Coming soon!' });
});

// @route   GET /api/rewards/history
// @desc    Get reward history
// @access  Private
router.get('/history', (req, res) => {
  res.json({ message: 'Reward history endpoint - Coming soon!' });
});

module.exports = router;