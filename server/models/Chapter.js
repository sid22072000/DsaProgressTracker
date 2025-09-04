const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
