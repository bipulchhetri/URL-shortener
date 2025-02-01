const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Get analytics by link ID
router.get('/:linkId', async (req, res) => {
  try {
    const { linkId } = req.params;
    const analytics = await Analytics.find({ linkId }).populate('linkId');
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
});

module.exports = router;
