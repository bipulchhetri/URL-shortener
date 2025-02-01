// const mongoose = require("mongoose");

// // Define the URL schema
// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true }, // The original long URL
//   shortUrl: { type: String, required: true, unique: true }, // The shortened URL
//   remarks: { type: String, default: "" }, // Remarks about the link
//   expireAt: { type: Date }, // Expiration date and time
//   clickCount: { type: Number, default: 0 }, // Number of times the link has been clicked
//   createdAt: { type: Date, default: Date.now }, // Creation date
//   analytics: [
//     {
//       timestamp: { type: Date, default: Date.now }, // Click timestamp
//       ipAddress: String, // IP address of the user
//       userAgent: String, // User agent of the device
//     },
//   ],
// });

// // Virtual field to compute status
// urlSchema.virtual("status").get(function () {
//   if (this.expireAt && new Date() > this.expireAt) {
//     return "Inactive"; // The link is inactive if it's past the expiration date
//   }
//   return "Active"; // Otherwise, the link is active
// });

// // Export the model
// const Url = mongoose.model("Url", urlSchema);
// module.exports = Url;


const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  remarks: { type: String, default: "" },
  expireAt: { type: Date },
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  analytics: [
    {
      timestamp: { type: Date, default: Date.now },
      ipAddress: String,
      userAgent: String,
    },
  ],
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
