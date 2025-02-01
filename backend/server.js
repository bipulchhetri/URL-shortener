const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const session = require('express-session');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://bp:12345@backend.v5zaj.mongodb.net/", {
  
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Mongoose Schema and Model
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  remarks: String,
  expireAt: Date,
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

// const Url = mongoose.model("Url", urlSchema);

// API Endpoints

/**
 * @route POST /api/links/create
 * @desc Create a new short URL
 */
app.post("/api/links/create", async (req, res) => {
  try {
    const { originalUrl, remarks, expireAt } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortUrl = nanoid(8); // Generate a unique short URL

    const newUrl = new Url({
      originalUrl,
      shortUrl,
      remarks,
      expireAt: expireAt ? new Date(expireAt) : null,
    });

    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ error: "Failed to create the link" });
  }
});

/**
 * @route GET /api/links
 * @desc Get all short URLs
 */
app.get("/api/links", async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

/**
 * @route GET /:shortUrl
 * @desc Redirect to the original URL and track analytics
 */
app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Check if the link has expired
    if (url.expireAt && new Date() > url.expireAt) {
      return res.status(410).json({ error: "Link has expired" });
    }

    // Increment click count
    url.clickCount += 1;

    // Track analytics
    const analyticsData = {
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    };
    url.analytics.push(analyticsData);

    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
});

/**
 * @route DELETE /api/links/:id
 * @desc Delete a link by ID
 */
app.delete("/api/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Url.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ error: "Failed to delete link" });
  }
});

/**
 * @route GET /api/links/:id/analytics
 * @desc Get analytics for a specific link
 */
app.get("/api/links/:id/analytics", async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findById(id);

    if (!url) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.json({ analytics: url.analytics });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


  
  // Virtual field for status
  urlSchema.virtual("status").get(function () {
    if (this.expireAt && new Date() > this.expireAt) {
      return "Inactive";
    }
    return "Active";
  });
  
  const Url = mongoose.model("Url", urlSchema);

  
  app.get("/api/links", async (req, res) => {
    try {
      const urls = await Url.find();
  
      // Add virtual status field in the response
      const urlsWithStatus = urls.map((url) => ({
        id: url._id,
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        remarks: url.remarks,
        clicks: url.clickCount,
        createdAt: url.createdAt,
        expireAt: url.expireAt,
        status: url.status, // Virtual field
      }));
  
      res.json(urlsWithStatus);
    } catch (error) {
      console.error("Error fetching links:", error);
      res.status(500).json({ error: "Failed to fetch links" });
    }
  });

  
  app.put("/api/links/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { originalUrl, remarks, expireAt } = req.body;
  
      const updatedUrl = await Url.findByIdAndUpdate(
        id,
        { originalUrl, remarks, expireAt: expireAt ? new Date(expireAt) : null },
        { new: true }
      );
  
      if (!updatedUrl) {
        return res.status(404).json({ error: "Link not found" });
      }
  
      res.json(updatedUrl);
    } catch (error) {
      console.error("Error updating link:", error);
      res.status(500).json({ error: "Failed to update link" });
    }
  });
  app.delete("/api/links/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedLink = await Url.findByIdAndDelete(id);
  
      if (!deletedLink) {
        return res.status(404).json({ error: "Link not found" });
      }
  
      res.json({ message: "Link deleted successfully" });
    } catch (error) {
      console.error("Error deleting link:", error);
      res.status(500).json({ error: "Failed to delete link" });
    }
  });
    


// Session setup
app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 },  // 1 hour session
  })
);

// User Model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));


// Registration Route
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Dashboard Route (only accessible if logged in)
app.get('/api/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  res.status(200).json({ message: "Welcome to your dashboard", user: req.session.user });
});


