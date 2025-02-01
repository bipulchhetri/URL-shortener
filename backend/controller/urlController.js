const Url = require("../models/urlModel");

const trackClick = async (req, res) => {
  const { shortUrl } = req.params;
  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"];

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Update analytics
    url.analytics.push({ ipAddress, userAgent });
    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl); // Redirect to the original URL
  } catch (error) {
    res.status(500).json({ error: "Error tracking click" });
  }
};


const getAnalytics = async (req, res) => {
    const { shortUrl } = req.params;
  
    try {
      const url = await Url.findOne({ shortUrl }).select("originalUrl shortUrl analytics");
      if (!url) {
        return res.status(404).json({ message: "Short URL not found" });
      }
      res.json(url);
    } catch (error) {
      res.status(500).json({ error: "Error fetching analytics" });
    }
  };
  
  module.exports = { trackClick, getAnalytics };
  
