const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    youtubeLink: { type: String },
    leetCodeLink: { type: String },
    codeforcesLink: { type: String },
    articleLink: { type: String },
    level: { type: String, enum: ["Easy", "Medium", "Tough"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
