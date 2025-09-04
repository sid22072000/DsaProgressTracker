const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get current user info for session restore
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ error: "User not found" });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        progress: user.progress,
      },
    });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        progress: user.progress,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Logout endpoint to clear cookie
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "progress.problemId"
    );
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { problemId, completed } = req.body;
    const user = await User.findById(req.user.userId);
    const progressItem = user.progress.find(
      (p) => p.problemId.toString() === problemId
    );
    if (progressItem) {
      progressItem.completed = completed;
    } else {
      user.progress.push({ problemId, completed });
    }
    await user.save();
    res.json(user.progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
