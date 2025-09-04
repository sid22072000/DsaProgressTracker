const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
