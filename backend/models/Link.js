const mongoose = require('mongoose');
const shortid = require('shortid');

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, default: () => shortid.generate() },
  remarks: { type: String },
  expireAt: { type: Date },
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

linkSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired links

module.exports = mongoose.model('Link', linkSchema);
