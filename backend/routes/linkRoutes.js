const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
// const device = require('express-device')
// Create a new shortened link


router.post('/create', async (req, res) => {
  const { originalUrl, remarks, expireAt } = req.body;

  try {
    const link = new Link({ originalUrl, remarks, expireAt });
    await link.save();
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Error creating link' });
  }
});

// Get all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching links' });
  }
});

// Redirect and track analytics
router.get('/:shortUrl', async (req, res) => {
  const ipAddress=request.headers["x-forwarded-for"] ? request.headers["x-forwarded-for"].split(",") [0].trim() : request.ip
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({ shortUrl });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    link.clickCount += 1;
    await link.save();

    // Record analytics
    const Analytics = require('../models/Analytics');
    await Analytics.create({
      linkId: link._id,
      ipAddress: ipAddress,
      userAgent: req.headers['user-agent'],
    });

    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

module.exports = router;
