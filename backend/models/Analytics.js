const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
