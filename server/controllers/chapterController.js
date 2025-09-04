const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");

exports.getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().populate({
      path: "topics",
      populate: { path: "problems" },
    });

    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createChapter = async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
