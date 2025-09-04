const Topic = require("../models/Topic");
const Problem = require("../models/Problem");

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("problems");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
